// app/api/now-playing/route.ts
import { NextResponse } from "next/server";
import axios from "axios";
import qs from "qs";

const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

async function getAccessToken() {
  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    qs.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res.data.access_token as string;
}

export async function GET() {
  try {
    const token = await getAccessToken();

    const now = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // No song playing → return fallback state
    if (now.status === 204 || !now.data) {
      return NextResponse.json({ isPlaying: false });
    }

    const item = now.data.item;

    return NextResponse.json({
      isPlaying: now.data.is_playing,
      name: item.name,
   artist: item.artists.map((a: { name: string }) => a.name).join(", "),
      album: item.album.name,
      albumArt: item.album.images[0].url,
      url: item.external_urls.spotify,
      progressMs: now.data.progress_ms,
      durationMs: item.duration_ms,
    });
  } catch (e) {
    return NextResponse.json({ isPlaying: false });
  }
}

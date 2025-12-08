// app/api/last-played/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

async function getAccessToken() {
  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }).toString(),
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

    const recent = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const track = recent.data.items[0].track;

    return NextResponse.json({
      name: track.name,
      artist: track.artists.map((a: { name: string }) => a.name).join(", "),
      albumArt: track.album.images[0].url,
      url: track.external_urls.spotify,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: true });
  }
}

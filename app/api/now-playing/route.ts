// // app/api/now-playing/route.ts----FOR SPOTIFY
// import { NextResponse } from "next/server";
// import axios from "axios";
// import qs from "qs";

// const clientId = process.env.SPOTIFY_CLIENT_ID!;
// const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
// const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

// async function getAccessToken() {
//   const res = await axios.post(
//     "https://accounts.spotify.com/api/token",
//     qs.stringify({
//       grant_type: "refresh_token",
//       refresh_token: refreshToken,
//     }),
//     {
//       headers: {
//         Authorization:
//           "Basic " +
//           Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     }
//   );

//   return res.data.access_token as string;
// }

// export async function GET() {
//   try {
//     const token = await getAccessToken();

//     const now = await axios.get(
//       "https://api.spotify.com/v1/me/player/currently-playing",
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     // No song playing → return fallback state
//     if (now.status === 204 || !now.data) {
//       return NextResponse.json({ isPlaying: false });
//     }

//     const item = now.data.item;

//     return NextResponse.json({
//       isPlaying: now.data.is_playing,
//       name: item.name,
//    artist: item.artists.map((a: { name: string }) => a.name).join(", "),
//       album: item.album.name,
//       albumArt: item.album.images[0].url,
//       url: item.external_urls.spotify,
//       progressMs: now.data.progress_ms,
//       durationMs: item.duration_ms,
//     });
//   } catch (e) {
//     return NextResponse.json({ isPlaying: false });
//   }
// }
//FOR-------------------LAST-FM


import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = process.env.LASTFM_USERNAME;
    const apiKey = process.env.LASTFM_API_KEY;

    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`,
      { cache: "no-store" }
    );

    const data = await res.json();
    const trackData = data?.recenttracks?.track;

    if (!trackData) {
      return NextResponse.json({ title: null });
    }

    const track = Array.isArray(trackData) ? trackData[0] : trackData;

    // ✅ true only if actively scrobbling right now
    const isNowPlaying = track?.["@attr"]?.nowplaying === "true";

    const albumArt =
      [...(track?.image ?? [])]
        .reverse()
        .find((img: { "#text": string }) => img["#text"])?.["#text"] ?? null;

    return NextResponse.json({
      playing: isNowPlaying,   // true = live, false = last played
      title: track?.name ?? null,
      artist: track?.artist?.["#text"] ?? null,
      albumArt: albumArt || null,
      url: track?.url ?? null,
    });

  } catch (error) {
    return NextResponse.json({ title: null });
  }
}
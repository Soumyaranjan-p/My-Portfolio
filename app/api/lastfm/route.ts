import { NextResponse } from "next/server";

async function getAlbumArt(artist: string, title: string, album: string, apiKey: string): Promise<string | null> {
  // 1. Last.fm album.getInfo
  if (artist && album) {
    try {
      const res = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}&api_key=${apiKey}&format=json`
      );
      const data = await res.json();
      const art = [...(data?.album?.image ?? [])]
        .reverse()
        .find((img: { "#text": string }) => img["#text"]?.trim())?.["#text"];
      if (art) return art;
    } catch {}
  }

  // 2. iTunes fallback
  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(`${artist} ${title}`)}&entity=song&limit=1`
    );
    const data = await res.json();
    const art = data?.results?.[0]?.artworkUrl100;
    // ✅ Correct pattern — upgrade to 600x600
    if (art) return art.replace("100x100bb.jpg", "600x600bb.jpg");
  } catch {}

  return null;
}

export async function GET() {
  try {
    const username = process.env.LASTFM_USERNAME;
    const apiKey = process.env.LASTFM_API_KEY;

    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`,
      { next: { revalidate: 0 } }
    );

    const data = await res.json();
    const trackData = data?.recenttracks?.track;

    if (!trackData) return NextResponse.json({ title: null });

    const track = Array.isArray(trackData) ? trackData[0] : trackData;
    const isNowPlaying = track?.["@attr"]?.nowplaying === "true";

    const artist = track?.artist?.["#text"] ?? "";
    const title = track?.name ?? "";
    
    // ✅ Last.fm album field is track.album["#text"], not track.album
    const album = track?.album?.["#text"] ?? "";

    // Log to confirm what we're working with
    console.log("Track data:", { artist, title, album });

    // Try Last.fm track-level images first
    let albumArt =
      [...(track?.image ?? [])]
        .reverse()
        .find((img: { "#text": string }) => img["#text"]?.trim())?.["#text"] ?? null;

    console.log("Last.fm track image:", albumArt);

    // Always try fallback since Last.fm track images are often blank
    if (!albumArt) {
      albumArt = await getAlbumArt(artist, title, album, apiKey!);
      console.log("Fallback art:", albumArt);
    }

    return NextResponse.json({
      playing: isNowPlaying,
      title: title || null,
      artist: artist || null,
      albumArt,
      url: track?.url ?? null,
    });

  } catch (error) {
    console.error("LastFM error:", error);
    return NextResponse.json({ title: null });
  }
}
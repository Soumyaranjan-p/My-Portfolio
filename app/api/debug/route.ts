// app/api/debug/route.ts
export async function GET() {
  const results: Record<string, unknown> = {};

  // Test iTunes raw response
  try {
    const res = await fetch(
      "https://itunes.apple.com/search?term=taylor+swift+daylight&entity=song&limit=1"
    );
    const data = await res.json();
    results.itunes_raw = data?.results?.[0] ?? "no results";
    results.itunes_art = data?.results?.[0]?.artworkUrl100 ?? "no art";
  } catch (e) {
    results.itunes = `❌ ${e}`;
  }

  // Test Last.fm album.getInfo raw response
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=Taylor+Swift&album=Lover&api_key=${process.env.LASTFM_API_KEY}&format=json`
    );
    const data = await res.json();
    results.lastfm_images = data?.album?.image ?? "no images";
  } catch (e) {
    results.lastfm = `❌ ${e}`;
  }

  return Response.json(results);
}
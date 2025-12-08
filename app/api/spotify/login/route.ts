import { NextResponse } from "next/server";

export async function GET() {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
    scope: "user-read-currently-playing user-read-recently-played",
  });

  return NextResponse.redirect(
    "https://accounts.spotify.com/authorize?" + params.toString()
  );
}

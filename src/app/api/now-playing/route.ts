import { NextResponse } from "next/server";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken() {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  return res.json();
}

export async function GET() {
  const { access_token } = await getAccessToken();

  const res = await fetch(NOW_PLAYING_URL, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (res.status === 204 || res.status > 400) {
    return NextResponse.json({ isPlaying: false });
  }

  const song = await res.json();

  if (song.currently_playing_type !== "track") {
    return NextResponse.json({ isPlaying: false });
  }

  return NextResponse.json({
    isPlaying: song.is_playing,
    title: song.item.name,
    artist: song.item.artists.map((a: { name: string }) => a.name).join(", "),
    album: song.item.album.name,
    albumArt: song.item.album.images[0]?.url,
    songUrl: song.item.external_urls.spotify,
    progressMs: song.progress_ms,
    durationMs: song.item.duration_ms,
  });
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

type Track = {
  playing: boolean;
  title: string | null;
  artist: string | null;
  albumArt: string | null;
  url: string | null;
};

// Spotify SVG logo (official green version)
function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Spotify"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

// Animated bars for "now playing"
function AnimatedBars() {
  return (
    <span className="flex items-end gap-[2px] h-3" aria-hidden="true">
      <span
        style={{
          display: "inline-block",
          width: 2,
          height: 8,
          background: "#1DB954",
          borderRadius: 1,
          animation: "musicBar 0.8s ease-in-out infinite",
          animationDelay: "0ms",
        }}
      />
      <span
        style={{
          display: "inline-block",
          width: 2,
          height: 12,
          background: "#1DB954",
          borderRadius: 1,
          animation: "musicBar 0.8s ease-in-out infinite",
          animationDelay: "150ms",
        }}
      />
      <span
        style={{
          display: "inline-block",
          width: 2,
          height: 6,
          background: "#1DB954",
          borderRadius: 1,
          animation: "musicBar 0.8s ease-in-out infinite",
          animationDelay: "300ms",
        }}
      />
    </span>
  );
}

export default function MusicStatus() {
  const [track, setTrack] = useState<Track | null>(null);
  const [iTunesArt, setITunesArt] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/now-playing");

      if (res.status === 204) return;

      if (!res.ok) {
        if (process.env.NODE_ENV === "development") {
          console.warn(`/api/now-playing returned ${res.status}`);
        }
        setError(true);
        return;
      }

      const data: Track = await res.json();
      if (data?.title) {
        setError(false);
        setTrack(data);
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to load now-playing:", err);
      }
      setError(true);
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, 20_000);
    return () => clearInterval(timer);
  }, [load]);

  useEffect(() => {
    if (!track?.title || !track?.artist || track?.albumArt) return;

    let cancelled = false;

    fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        `${track.artist} ${track.title}`
      )}&entity=song&limit=1`
    )
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        const url = d?.results?.[0]?.artworkUrl100?.replace(
          "100x100bb.jpg",
          "600x600bb.jpg"
        );
        if (url) setITunesArt(url);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [track?.title, track?.artist, track?.albumArt]);

  const resolvedArt = useMemo(
    () => track?.albumArt ?? iTunesArt ?? null,
    [track?.albumArt, iTunesArt]
  );

  // Don't render until mounted (prevents SSR hydration issues)
  if (!mounted) return null;
  if (!track?.title || error) return null;

  const label = track.playing ? "Now playing" : "Last played";

  const inner = (
    <motion.div
      key={track.title}
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* keyframes injected once */}
      <style>{`
        @keyframes musicBar {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
      `}</style>

     <a
  href={track.url ?? "#"}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`${label}: ${track.title} by ${track.artist}`}
  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full 
             bg-white/10 dark:bg-white/10 
             border border-zinc-200 dark:border-white/10 
             backdrop-blur-md
             hover:bg-white/20 dark:hover:bg-white/10 
             hover:border-zinc-300 dark:hover:border-emerald-500/40
             transition-all duration-200
             max-w-[420px] overflow-hidden"
  style={{ pointerEvents: track.url ? "auto" : "none" }}
>
  {/* Spotify Icon */}
  <SpotifyIcon className="w-4 h-4 text-[#1DB954] flex-shrink-0" />

  {/* Label */}
  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
    {label} —
  </span>

  {/* Artist · Title */}
  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
    {track.artist}
    <span className="text-zinc-400 dark:text-zinc-500 mx-1">·</span>
    {track.title}
  </span>

  {/* Animated bars */}
  {track.playing && <AnimatedBars />}
</a>

      {/* Scoped styles for the Spotify icon */}
      <style>{`
        .spotify-icon {
          width: 14px;
          height: 14px;
          color: #1DB954;
          flex-shrink: 0;
        }
      `}</style>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {inner}
    </AnimatePresence>
  );
}
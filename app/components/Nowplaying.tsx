

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

type Track = {
  playing: boolean;
  title: string | null;
  artist: string | null;
  albumArt: string | null;
  url: string | null;
};

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

function AnimatedBars() {
  return (
    <span className="flex items-end gap-[2px] h-3" aria-hidden="true">
      {[8, 12, 6].map((height, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 2,
            height,
            background: "#1DB954",
            borderRadius: 1,
            animation: "musicBar 0.8s ease-in-out infinite",
            animationDelay: `${i * 150}ms`,
          }}
        />
      ))}
    </span>
  );
}

export default function MusicStatus() {
  const [track, setTrack] = useState<Track | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/now-playing", {
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Now playing API failed:", res.status);
        return;
      }

      const data: Track = await res.json();

      console.log("Music API:", data);

      setTrack(data);
    } catch (error) {
      console.error("Failed to fetch music:", error);
    }
  }, []);

  useEffect(() => {
    load();

    const interval = setInterval(load, 20000);

    return () => clearInterval(interval);
  }, [load]);

  if (!track?.title) {
    return null;
  }

  const label = track.playing ? "Now playing" : "Last played";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${track.artist}-${track.title}`}
        initial={{ opacity: 0, y: 8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.97 }}
        transition={{
          duration: 0.35,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <style>{`
          @keyframes musicBar {
            0%,100% { transform: scaleY(0.4); }
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
        >
          <SpotifyIcon className="w-4 h-4 text-[#1DB954] flex-shrink-0" />

          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
            {label} —
          </span>

          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
            {track.artist}
            <span className="mx-1 text-zinc-400 dark:text-zinc-500">·</span>
            {track.title}
          </span>

          {track.playing && <AnimatedBars />}
        </a>
      </motion.div>
    </AnimatePresence>
  );
}


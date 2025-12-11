"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

type SpotifyTrack = {
  type: "now" | "recent";
  name: string;
  artist: string;
  albumArt: string;
  url: string;
  progressMs?: number;
  durationMs?: number;
};

export default function SpotifyStatus() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const now = await fetch("/api/now-playing").then((res) => res.json());
      if (now.isPlaying) {
        setTrack({ type: "now", ...now });
      } else {
        const last = await fetch("/api/last-played").then((res) => res.json());
        setTrack({ type: "recent", ...last });
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const timer = setInterval(load, 8000);
    return () => clearInterval(timer);
  }, []);

  if (loading || !track) return null;

  const progress =
    track.type === "now" &&
    track.progressMs !== undefined &&
    track.durationMs !== undefined
      ? Math.round((track.progressMs / track.durationMs) * 100)
      : 0;

  return (
   
   <motion.div
   
   
   initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{
    scale: 1.02,
    boxShadow: "0px 8px 24px rgba(0,0,0,0.08)"
  }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
   
   >

    <Card
  className="
  w-full max-w-2xl mt-6 rounded-2xl
  border border-neutral-200 bg-white shadow-sm
    dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-none
    transition-all duration-300 p-1
  "
>
  {/* Inner layout row */}
  <div className="flex items-center justify-between gap-4 p-2">
    {/* LEFT: Album + Text */}
    <div className="flex items-center gap-3 flex-1 min-w-0 ml-6">
      {/* Album Art */}
      {track.albumArt && (
        <Image
          src={track.albumArt}
          alt={track.name}
          width={64}
          height={64}
          className="rounded-md shrink-0"
        />
      )}

      {/* Text + Progress */}
      <div className="flex flex-col min-w-0">
        {/* Status Label */}
        <div className="flex items-center gap-1 text-sm text-neutral-700 dark:text-neutral-300">
          <Image
            src="/assets/Spotify.svg"
            alt="Spotify"
            width={20}
            height={20}
          />
          {track.type === "now" ? "Now playing" : "Last played"}
        </div>

        {/* Song Title */}
        <p className="text-base font-semibold truncate text-neutral-600 dark:text-neutral-300">
          {track.name}
        </p>

        {/* Artist */}
        <p className="text-sm truncate text-neutral-600 dark:text-neutral-400">
          {track.artist}
        </p>

        {/* Progress Bar */}
        {track.type === "now" && (
          <Progress
            className="
              mt-2 h-1 bg-neutral-200 dark:bg-neutral-700
              [&>div]:bg-[#1DB954]
            "
          />
        )}
      </div>
    </div>

    {/* RIGHT: Play Button */}
    <Button
      variant="ghost"
      size="icon"
      className="
        shrink-0 ml-2 border border-neutral-200 rounded-xl hover:bg-neutral-100
        dark:hover:bg-neutral-800 dark:border-neutral-700 mr-6
      "
      onClick={() => window.open(track.url, "_blank")}
    >
      ▶
    </Button>
  </div>
</Card>
      </motion.div>


  );
}

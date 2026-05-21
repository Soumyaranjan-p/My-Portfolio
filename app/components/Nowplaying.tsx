"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Track = {
  playing: boolean;
  title: string | null;
  artist: string | null;
  albumArt: string | null;
  url: string | null;
};

export default function MusicStatus() {
  const [track, setTrack] = useState<Track | null>(null);
  const [iTunesArt, setITunesArt] = useState<string | null>(null);
  const [error, setError] = useState(false);

  // ✅ Stable reference so the interval doesn't re-register on every render
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

  //  Polling effect — load() is a stable ref, so this only runs once
  useEffect(() => {
    load();
    const timer = setInterval(load, 20_000);
    return () => clearInterval(timer);
  }, [load]);

  //  iTunes fallback — only fetches when track has no albumArt
  // setState here is inside an async callback, not the synchronous effect body
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
      cancelled = true; // ✅ Cleanup prevents stale setState on unmount
    };
  }, [track?.title, track?.artist, track?.albumArt]);

  // ✅ Derived value — no effect needed, just pick the right art source
  const resolvedArt = useMemo(
    () => track?.albumArt ?? iTunesArt ?? null,
    [track?.albumArt, iTunesArt]
  );

  if (!track?.title || error) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={track.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        whileHover={{ scale: 1.02, boxShadow: "0px 8px 24px rgba(0,0,0,0.08)" }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-2xl mt-6 rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900 transition-all duration-300 p-3">
          <div className="flex items-center justify-between gap-4">
            {/* LEFT SIDE */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* ALBUM ART */}
              {resolvedArt ? (
                <Image
                  src={resolvedArt}
                  alt={track.title ?? "Album Art"}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-2xl">
                  🎵
                </div>
              )}

              {/* SONG INFO */}
              <div className="flex flex-col min-w-0">
                {track.playing ? (
                  <div className="flex items-center gap-2 text-sm text-green-500 font-medium">
                    ● Now Playing
                    <div className="flex gap-[2px] ml-1 items-end">
                      <span className="w-[3px] h-3 bg-green-500 animate-bounce" />
                      <span className="w-[3px] h-4 bg-green-500 animate-bounce [animation-delay:100ms]" />
                      <span className="w-[3px] h-2 bg-green-500 animate-bounce [animation-delay:200ms]" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-neutral-400 font-medium">
                    ○ Last Played
                  </div>
                )}

                <p className="text-base font-semibold truncate text-neutral-700 dark:text-neutral-200">
                  {track.title}
                </p>
                <p className="text-sm truncate text-neutral-500 dark:text-neutral-400">
                  {track.artist}
                </p>
              </div>
            </div>

            {/* PLAY BUTTON */}
            {track.url && (
              <Button
                variant="ghost"
                size="icon"
                className="border border-neutral-200 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:border-neutral-700"
                onClick={() => window.open(track.url!, "_blank")}
              >
                ▶
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
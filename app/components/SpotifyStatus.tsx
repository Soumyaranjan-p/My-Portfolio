"use client";

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
      const now = await fetch("/api/now-playing").then(res => res.json());

      if (now.isPlaying) {
        setTrack({ type: "now", ...now });
      } else {
        const last = await fetch("/api/last-played").then(res => res.json());
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
  track.type === "now" && track.progressMs !== undefined && track.durationMs
    ? Math.round((track.progressMs / track.durationMs) * 100)
    : 0;

  return (
    <Card className="max-w-xl mt-8 p-4 flex items-center gap-4 shadow-lg rounded-xl">
      {/* Album Art */}
      <Image
        src={track.albumArt}
        alt={track.name}
        width={70}
        height={70}
        className="rounded-md"
      />

      {/* Text Content */}
      <div className="flex-1">
        <p className="text-xs text-muted-foreground mb-1">
          {track.type === "now" ? "🎧 Now playing" : "⏪ Last played"}
        </p>

        <p className="text-base font-semibold leading-tight">{track.name}</p>
        <p className="text-sm text-muted-foreground">{track.artist}</p>

        {track.type === "now" && (
          <Progress value={progress} className="mt-2" />
        )}
      </div>

      {/* Open in Spotify Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => window.open(track.url, "_blank")}
      >
        ▶
      </Button>
    </Card>
  );
}

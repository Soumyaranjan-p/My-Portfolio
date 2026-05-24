"use client";

import { useEffect, useState } from "react";

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function getViews() {
      try {
        const res = await fetch("/api/views", {
          method: "POST",
        });

        const data = await res.json();

        setCount(data.count);
      } catch {
        setCount(null);
      }
    }

    getViews();
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-[12px] font-mono text-neutral-500 dark:text-neutral-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>

      <span>
        {count !== null
          ? `${new Intl.NumberFormat("en-US").format(count)} visitors`
          : ".. visitors"}
      </span>
    </div>
  );
}
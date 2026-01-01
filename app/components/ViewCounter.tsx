"use client";

import { useEffect, useState } from "react";
import AnimatedButton from "@/components/ui/animated-button";

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const viewed = sessionStorage.getItem("viewed");
    const method = viewed ? "GET" : "POST";

    if (!viewed) {
      sessionStorage.setItem("viewed", "true");
    }

    fetch("/api/views", { 
      method,
      headers: { "Content-Type": "application/json" }
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCount(data.count ?? 0);
      })
      .catch((err) => {
        console.error("View counter fetch failed:", err);
        setCount(0);
      });
  }, []);

  if (count === null) {
    return (
      <div className="flex justify-center mt-2">
        <AnimatedButton className="text-sm italic font-mono text-zinc-500">
          Loading visitors... 👀
        </AnimatedButton>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-2">
      <AnimatedButton className="text-sm italic font-mono font-medium text-zinc-700 dark:text-dark-white-300">
        {count.toLocaleString()} Total views • You're the {' '}   
          <span className="font-semibold">{ordinal(count)}</span> visitor 
      </AnimatedButton>
    </div>
  );
}

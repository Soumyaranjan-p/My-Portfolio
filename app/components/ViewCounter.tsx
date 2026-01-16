
"use client";

import { useEffect, useState } from "react";
import AnimatedButton from "@/components/ui/animated-button";
import LiquidMetalButton from "@/components/ui/liquid-metal";

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
      <LiquidMetalButton className="text-sm italic font-mono font-medium text-zinc-900 dark:text-dark-white-300">
        
          <span className="font-semibold dark:text-amber-50"> You’re the {ordinal(count)} Legend </span> 
      </LiquidMetalButton>
    </div>
  );
}
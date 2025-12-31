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

    if (!viewed) {
      sessionStorage.setItem("viewed", "true");

      fetch("/api/views", { method: "POST" })
        .then((res) => res.json())
        .then((data) => setCount(data.count))
        .catch(() => {
          // fail silently in production
        });
    }
  }, []);

 
if (count === null) {
  return (
    <div className="flex justify-center mt-2">
      <AnimatedButton className="text-sm italic font-mono text-zinc-500">
        Welcome 👋
      </AnimatedButton>
    </div>
  );
}

return (
  <div className="flex justify-center mt-2">
    <AnimatedButton className="text-sm italic font-mono font-medium text-zinc-700 dark:text-dark-white-300">
      You’re the <span className="font-semibold">{ordinal(count)}</span> visitor
    </AnimatedButton>
  </div>
);
}
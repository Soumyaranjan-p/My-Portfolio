"use client";
import Container from "./Container";
import { quotes } from "@/app/config/Quote"; 
import { useState } from "react";

export const Quote = () => {
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  return (
    <Container className="pt-0 pb-6 sm:pb-8">
      <div className="h-px w-full bg-zinc-200 dark:bg-[#1e1e1e] mt-[-6px]" />
      <div className="relative border border-dashed border-neutral-300 dark:border-neutral-700 px-6 sm:px-8 py-6">

        {/* Crosshair corners */}
        {["top-[-6px] left-[-6px]", "top-[-6px] right-[-6px]", "bottom-[-6px] left-[-6px]", "bottom-[-6px] right-[-6px]"].map((pos, i) => (
          <span key={i} className={`absolute w-3 h-3 ${pos}`}>
            <span className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-neutral-400 dark:bg-neutral-600" />
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-neutral-400 dark:bg-neutral-600" />
          </span>
        ))}

        <p
        suppressHydrationWarning
        className="font-mono italic text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 mb-3">
          {quote.quote}
        </p>

        <p className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
          — <span className="text-neutral-800 dark:text-neutral-200 font-medium">{quote.author}</span>
          <span className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800 opacity-40" />
        </p>

      </div>
    </Container>
  );
};
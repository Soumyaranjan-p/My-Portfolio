"use client";
import { useEffect, useState } from "react";

import Container from "./Container";
import { quotes } from "@/app/config/Quote";
import { CrosshairBox } from "./Crosshair";

export const Quote = () => {
  const [currentQuote, setCurrentQuote] = useState<{
    quote: string;
    author: string;
  } | null>(null);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  if (!currentQuote) return null;

  const { quote, author } = currentQuote;

  return (
    <Container className="py-10 sm:py-14 md:py-16">
      <CrosshairBox  className="px-6 py-6">
      <div
        className="
        relative
        px-4 sm:px-6 md:px-10
        py-8 sm:py-10 md:py-12
        rounded-xl md:rounded-2xl
        font-custom2
        text-neutral-700 dark:text-neutral-300
        text-xs sm:text-sm md:text-base
        bg-neutral-100 dark:bg-neutral-900
        border border-dashed
        border-neutral-300 dark:border-neutral-700
        max-w-4xl
        mx-auto
        "
      >
        <svg
          aria-hidden="true"
          width="105"
          height="78"
          className="
          absolute
          top-4 sm:top-6 md:top-8
          left-4 sm:left-6 md:left-8
          w-12 sm:w-16 md:w-20
          h-auto
          fill-zinc-200 dark:fill-white/10
          "
        ></svg>

        <p
          className="
          relative z-10
          italic
          font-mono
          font-medium
          text-zinc-500 dark:text-dark-white-300
          leading-relaxed
          text-pretty
          text-sm sm:text-base md:text-lg
          "
        >
          “{quote}”
        </p>

        <p
          className="
          mt-4
          text-right
          italic
          font-mono
          text-highlight
          text-xs sm:text-sm md:text-base
          "
        >
          — {author}
        </p>
      </div>
      </CrosshairBox>
    </Container>
  );
};

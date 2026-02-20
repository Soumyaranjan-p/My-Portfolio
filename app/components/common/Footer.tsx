"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";
import { footerConfig } from "@/app/config/Footer";

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

//views counter
function ViewsCounter({ count }: { count: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center
                 w-full sm:w-auto max-w-full"
    >
      {/* Glow ring */}
      <motion.span
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: isHovered
            ? [
                "0 0 0px 0px rgba(139,92,246,0)",
                "0 0 18px 5px rgba(139,92,246,0.55)",
                "0 0 12px 3px rgba(99,102,241,0.35)",
              ]
            : [
                "0 0 0px 0px rgba(139,92,246,0)",
                "0 0 12px 3px rgba(139,92,246,0.28)",
                "0 0 0px 0px rgba(139,92,246,0)",
              ],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Spinning border */}
      <motion.span
        className="absolute inset-[-2px] rounded-2xl overflow-hidden"
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        <span
          className="block w-full h-full"
          style={{
            background:
              "conic-gradient(from 0deg, #7c3aed, #6366f1, #06b6d4, #a855f7, #7c3aed)",
            padding: 2,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
          }}
        />
      </motion.span>

      {/* Body */}
      <motion.div
        className="relative z-10 flex items-center gap-2
                   px-3 sm:px-4 md:px-5
                   py-1.5 sm:py-2
                   rounded-2xl
                   bg-white/80 dark:bg-neutral-900/90
                   backdrop-blur-sm
                   min-w-[140px] sm:min-w-[160px]"
        animate={{ y: isHovered ? -1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Eye icon */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3 h-3 sm:w-4 sm:h-4
                     text-violet-500 dark:text-violet-400"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </motion.svg>

        {/* Divider */}
        <span className="w-px h-3 sm:h-4 bg-neutral-200 dark:bg-neutral-700" />

        {/* Count */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            className="font-mono font-bold
                       text-xs sm:text-sm md:text-base
                       text-violet-600 dark:text-violet-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {ordinal(count)}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

//footer
export default function Footer() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const viewed = sessionStorage.getItem("viewed");
    const method = viewed ? "GET" : "POST";
    if (!viewed) sessionStorage.setItem("viewed", "true");

    fetch("/api/views", {
      method,
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCount(data.count ?? 0);
      })
      .catch(() => setCount(0));
  }, []);

  return (
    <Container className="py-10 sm:py-14 md:py-16">
      <div
        className="flex flex-col md:flex-row
                   items-center md:items-center
                   justify-center md:justify-between
                   gap-6 md:gap-0"
      >
        {/* Left Side */}
        <p
          className="text-[9px] sm:text-[11px] md:text-[12px]
                     text-center md:text-left
                     text-[#8E8F8F] dark:text-[#8E8F8F]
                     font-semibold"
        >
          &copy; {new Date().getFullYear()} <b>{footerConfig.copyright}</b>
        </p>

        {/* Right Side */}
        {count !== null && (
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <ViewsCounter count={count} />
          </div>
        )}
      </div>
    </Container>
  );
}

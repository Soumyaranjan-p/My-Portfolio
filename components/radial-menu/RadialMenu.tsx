"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { GooeyFilter } from "./GooeyFilter";
import { HamburgerIcon } from "./HamburgerIcon";
import { RadialMenuItem } from "./RadialMenuItem";
import { RadialMenuProps } from "./types";

/** Convert polar (angle in degrees, radius) → Cartesian (x, y) */
function polarToCartesian(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(rad) * radius, y: -Math.sin(rad) * radius };
}

const triggerVariants: Variants = {
  idle: { scale: 1 },
  pressed: { scale: 0.88 },
  hover: { scale: 1.08 },
};

export function RadialMenu({
  items,
  radius = 88,
  startAngle = 135,
  spreadAngle = 180,
  className = "",
}: RadialMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const filterId = `goo-${useId().replace(/:/g, "")}`;
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Derived item positions ---
  const positions = items.map((_, i) => {
    const count = items.length;
    const angle =
      count === 1
        ? startAngle
        : startAngle - (spreadAngle / (count - 1)) * i;
    return polarToCartesian(angle, radius);
  });

  // --- Close on outside click ---
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [isOpen]);

  // --- Close on Escape ---
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {/* Invisible SVG filter — placed outside the gooey div so layout isn't affected */}
      <GooeyFilter id={filterId} blur={14} cutoff={20} />

      <div
        ref={containerRef}
        className={`relative inline-flex items-center justify-center ${className}`}
        role="navigation"
        aria-label="Radial navigation menu"
      >
        {/*
         * Gooey wrapper
         * The filter must wrap BOTH the trigger and all items so the blobs
         * visually merge as items travel through the trigger on open/close.
         * The div needs overflow:visible and a generous padding so clipping
         * doesn't cut the blur effect.
         */}
        <div
          style={{
            filter: `url(#${filterId})`,
            // Extra padding lets the gaussian blur breathe without clipping
            padding: radius + 56,
            margin: -(radius + 56),
            willChange: "filter",
          }}
          className="relative flex items-center justify-center"
        >
          {/* --- Item buttons (rendered under trigger so trigger stays on top) --- */}
          <AnimatePresence>
            {isOpen &&
              items.map((item, i) => (
                <RadialMenuItem
                  key={item.id}
                  item={item}
                  x={positions[i].x}
                  y={positions[i].y}
                  index={i}
                  onClose={close}
                />
              ))}
          </AnimatePresence>

          {/* --- Trigger button --- */}
          <motion.button
            onClick={toggle}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="
              relative z-10
              flex h-14 w-14 items-center justify-center rounded-full
              bg-white/70 dark:bg-zinc-800/80
              border border-white/60 dark:border-zinc-600/60
              shadow-2xl shadow-black/15 dark:shadow-black/50
              backdrop-blur-2xl
              text-zinc-800 dark:text-zinc-100
              outline-none
              focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2
              cursor-pointer select-none
            "
            variants={triggerVariants}
            initial="idle"
            whileHover="hover"
            whileTap="pressed"
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          >
            <HamburgerIcon isOpen={isOpen} />

            {/* Subtle inner glow ring that grows on open */}
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full"
              animate={
                isOpen
                  ? {
                      boxShadow:
                        "0 0 0 3px rgba(139,92,246,0.55), 0 0 0 6px rgba(139,92,246,0.18)",
                    }
                  : { boxShadow: "0 0 0 0px rgba(139,92,246,0)" }
              }
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            />
          </motion.button>
        </div>
      </div>
    </>
  );
}
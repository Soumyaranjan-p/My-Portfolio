"use client";

import { motion, Variants } from "motion/react";
import { RadialMenuItemConfig } from "./types";

interface RadialMenuItemProps {
  item: RadialMenuItemConfig;
  /** Position relative to center button */
  x: number;
  y: number;
  index: number;
  onClose: () => void;
}

const itemVariants: Variants = {
  closed: {
    x: 0,
    y: 0,
    scale: 0.3,
    opacity: 0,
  },
  open: (custom: { x: number; y: number; index: number }) => ({
    x: custom.x,
    y: custom.y,
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 22,
      mass: 0.8,
      delay: custom.index * 0.045,
    },
  }),
};

const tooltipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },
};

export function RadialMenuItem({
  item,
  x,
  y,
  index,
  onClose,
}: RadialMenuItemProps) {
  const handleClick = () => {
    item.onClick?.();
    onClose();
  };

  const Tag = item.href ? "a" : "button";

  return (
    <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group"
  style={{ willChange: "transform, opacity" }}
  custom={{ x, y, index }}
  variants={itemVariants}
  initial="closed"
  animate="open"
  exit="closed"
    >
      {/* Tooltip */}
      <motion.span
        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2
                   whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium
                   bg-white/80 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-200
                   shadow-lg backdrop-blur-md border border-white/30 dark:border-zinc-700/50"
        variants={tooltipVariants}
        initial="hidden"
        whileHover="visible"
      >
        {item.label}
      </motion.span>

      {/* Button */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.88 }}
        transition={{ type: "spring", stiffness: 500, damping: 24 }}
      >
        <Tag
          href={item.href}
          onClick={handleClick}
          aria-label={item.label}
          className="
            flex h-12 w-12 items-center justify-center rounded-full
            bg-white/60 dark:bg-zinc-800/70
            border border-white/50 dark:border-zinc-600/50
            shadow-xl shadow-black/10 dark:shadow-black/40
            backdrop-blur-xl
            text-zinc-700 dark:text-zinc-200
            outline-none
            focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2
            transition-colors hover:bg-white/80 dark:hover:bg-zinc-700/80
            cursor-pointer select-none
          "
          tabIndex={0}
        >
          <span className="h-5 w-5">{item.icon}</span>
        </Tag>
      </motion.div>
    </motion.div>
  );
}
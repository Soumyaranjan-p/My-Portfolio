"use client";

import { motion } from "motion/react";

interface HamburgerIconProps {
  isOpen: boolean;
}

const lineClass =
  "absolute left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-current origin-center";

export function HamburgerIcon({ isOpen }: HamburgerIconProps) {
  return (
    <span className="relative flex h-5 w-5 items-center justify-center">
      {/* Top line → rotates to first stroke of X */}
      <motion.span
        className={lineClass}
        animate={
          isOpen
            ? { rotate: 45, y: 0, opacity: 1 }
            : { rotate: 0, y: -7, opacity: 1 }
        }
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
      {/* Middle line → fades out */}
      <motion.span
        className={lineClass}
        animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
      {/* Bottom line → rotates to second stroke of X */}
      <motion.span
        className={lineClass}
        animate={
          isOpen
            ? { rotate: -45, y: 0, opacity: 1 }
            : { rotate: 0, y: 7, opacity: 1 }
        }
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
    </span>
  );
}
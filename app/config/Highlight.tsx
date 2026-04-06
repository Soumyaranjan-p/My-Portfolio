"use client";
import { useRef } from "react";

type HighlightProps = {
  children: React.ReactNode;
};

export default function Highlight({ children }: HighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    //  Cursor glow position
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);

    // 🧲 Magnetic effect (subtle movement)
    const moveX = (x - rect.width / 2) * 0.15;
    const moveY = (y - rect.height / 2) * 0.25;

    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;

    el.style.transform = "translate(0, 0)";
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block group px-1 py-[2px] transition-transform duration-200 ease-out"
    >
      {/* Text */}
      <span className="relative z-10 font-medium text-neutral-900 dark:text-neutral-100">
        {children}
      </span>
                  {/* Highlight (bottom → top fill with 20% base) */}
<span
  className="absolute left-0 right-0 bottom-0 h-full 
  bg-[#fff3a3] dark:bg-yellow-400/50 
  rounded-sm 
  origin-bottom scale-y-[0.2] 
  transition-transform duration-300 ease-out 
  group-hover:scale-y-100 -z-10"
/>
      {/*  Cursor-follow glow */}
      <span
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(120px circle at var(--x) var(--y), rgba(255,243,163,0.6), transparent 60%)",
        }}
      />
    </span>
  );
}
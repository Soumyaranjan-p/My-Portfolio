"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LiquidLoader = () => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  // Disable scrolling immediately
  document.body.style.overflow = "hidden";

  const ctx = gsap.context(() => {
    const obj = { value: 0 };

    gsap
      .timeline()
      // Counter + liquid fill
      .to(obj, {
        value: 100,
        duration: 3,
        ease: "none",
        onUpdate: () => {
          const v = Math.round(obj.value);

          // Update text
          counterRef.current!.innerText = `${v}%`;

          // Update liquid height
          gsap.set(liquidRef.current!, {
            height: `${v}%`,
          });
        },
      })
      // Small pause at 100
      .to({}, { duration: 0.2 })
      // Slow fade out
      .to(containerRef.current!, {
        opacity: 0,
        duration: 1.8,
        ease: "power2.out",
        pointerEvents: "none",
        onComplete: () => {
          //  Re-enable scrolling AFTER loader ends
          document.body.style.overflow = "";
        },
      });
  });

  return () => {
    //  Safety cleanup (very important)
    document.body.style.overflow = "";
    ctx.revert();
  };
}, []);


  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="flex items-center gap-6">
        {/* Ball */}
        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-300">
          {/* Liquid */}
          <div
            ref={liquidRef}
            className="absolute bottom-0 w-full bg-red-600"
            style={{ height: "0%" }}
          />

          {/* Glass highlight (optional) */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-br from-white/40 to-transparent" />
        </div>

        {/* Counter */}
        <span
          ref={counterRef}
          className="text-1xl font-bold tracking-tight text-slate-900"
        >
          0%
        </span>
      </div>
    </div>
  );
};

export default LiquidLoader;

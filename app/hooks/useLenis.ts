// hooks/useLenis.ts
"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";

export function useLenis() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => 1 - Math.pow(2, -10 * t),
      wheelMultiplier: 0.9,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.3,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    setLenis(lenis);

    return () => {
      lenis.destroy();
    };
  }, []);

  return lenis;
}

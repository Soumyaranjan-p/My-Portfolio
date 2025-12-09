"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function LenisWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.8,
        easing: (t: number) => 1 - Math.pow(2, -10 * t),
        wheelMultiplier: 0.9, //  increase this for more speed
        smoothWheel: true,
        smoothTouch: true,
        touchMultiplier: 1.3, // ⬅increases touch scroll speed
      }}
    >

      {children}
    </ReactLenis>
  );
}

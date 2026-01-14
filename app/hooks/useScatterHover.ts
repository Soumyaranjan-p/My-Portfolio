// useMagneticText.ts
import { useRef } from "react";
import gsap from "gsap";

export function useMagneticText() {
  const refs = useRef<HTMLSpanElement[]>([]);

  const setRef = (el: HTMLSpanElement | null) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  const onMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;

    refs.current.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const dx = clientX - (rect.left + rect.width / 2);
      const dy = clientY - (rect.top + rect.height / 2);

      gsap.to(el, {
        x: dx * 0.08,
        y: dy * 0.08,
        duration: 0.4,
        ease: "power3.out",
      });
    });
  };

  const onLeave = () => {
    gsap.to(refs.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return { setRef, onMove, onLeave };
}

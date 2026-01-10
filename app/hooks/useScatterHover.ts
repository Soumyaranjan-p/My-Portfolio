import { useRef } from "react";
import gsap from "gsap";

export function useScatterHover() {
  const refs = useRef<HTMLSpanElement[]>([]);
  refs.current = [];

  const setRef = (el: HTMLSpanElement | null) => {
    if (el) refs.current.push(el);
  };

  const onEnter = () => {
    gsap.to(refs.current, {
      x: () => gsap.utils.random(-120, 120),
      y: () => gsap.utils.random(-120, 120),
      rotate: () => gsap.utils.random(-90, 90),
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: {
        each: 0.02,
        from: "random",
      },
    });
  };

  const onLeave = () => {
    gsap.to(refs.current, {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power4.out",
      stagger: {
        each: 0.02,
        from: "random",
      },
    });
  };

  return { setRef, onEnter, onLeave };
}

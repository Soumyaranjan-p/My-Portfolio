import { useRef } from "react";
import gsap from "gsap";

const CHARS = "01アイウエオカキクケコ#$%&";


export function useScrambleText() {
  const refs = useRef<HTMLSpanElement[]>([]);

  const setRef = (el: HTMLSpanElement | null) => {
    if (el && !refs.current.includes(el)) {
      el.dataset.char = el.textContent || "";
      refs.current.push(el);
    }
  };

  const onEnter = () => {
    refs.current.forEach((el, i) => {
      const original = el.dataset.char || "";
      let iteration = 0;

      gsap.to({}, {
       duration: 0.4,

        ease: "none",
        onUpdate: () => {
          el.textContent =
            iteration < 1
              ? CHARS[Math.floor(Math.random() * CHARS.length)]
              : original;
          iteration += 0.15;
        },
       delay: i * 0.01
      });
    });
  };

  const onLeave = () => {
    refs.current.forEach((el) => {
      el.textContent = el.dataset.char || "";
    });
  };

  return { setRef, onEnter, onLeave };
}

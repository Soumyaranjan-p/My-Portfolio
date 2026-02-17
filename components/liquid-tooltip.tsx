// "use client";

// import React, { useState } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useSpring,
//   useMotionValue,
//   useTransform,
// } from "framer-motion";

// type Placement = "top" | "bottom" | "left" | "right";

// interface LiquidTooltipProps {
//   text: string;
//   children: React.ReactNode;
//   placement?: Placement;
// }

// export const LiquidTooltip = ({
//   text,
//   children,
//   placement = "top",
// }: LiquidTooltipProps) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const springConfig = { stiffness: 100, damping: 15, mass: 0.1 };

//   const value = useMotionValue(0);

//   const rotate = useSpring(
//     useTransform(value, [-100, 100], [-15, 15]),
//     springConfig
//   );

//   const springValue = useSpring(value, springConfig);

//   const handleMouseMove = (event: React.MouseEvent<HTMLSpanElement>) => {
//     const halfWidth = event.currentTarget.offsetWidth / 2;
//     value.set(event.nativeEvent.offsetX - halfWidth);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     value.set(0);
//   };

//   const getPosition = () => {
//     switch (placement) {
//       case "top":
//         return "left-1/2 -top-12 -translate-x-1/2";
//       case "bottom":
//         return "left-1/2 -bottom-12 -translate-x-1/2";
//       case "left":
//         return "top-1/2 -left-12 -translate-y-1/2";
//       case "right":
//         return "top-1/2 -right-12 -translate-y-1/2";
//       default:
//         return "left-1/2 -top-12 -translate-x-1/2";
//     }
//   };

//   return (
//     <span
//       className="relative inline-flex"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={handleMouseLeave}
//       onMouseMove={handleMouseMove}
//     >
//       <AnimatePresence>
//         {isHovered && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.6, y: 10 }}
//             animate={{
//               opacity: 1,
//               scale: 1,
//               y: -10,
//               transition: { type: "spring", stiffness: 260, damping: 20 },
//             }}
//             exit={{ opacity: 0, scale: 0.6, y: 10 }}
//             style={{ x: springValue, rotate }}
//             className={`absolute z-50 px-3 py-1.5 text-xs font-semibold rounded-lg bg-black text-white shadow-xl ${getPosition()}`}
//           >
//             {text}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {children}
//     </span>
//   );
// };
"use client";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

type Placement = "top" | "bottom" | "left" | "right";
interface LiquidTooltipProps {
  text: string;
  children: React.ReactNode;
  placement?: Placement;
}

export function LiquidTooltip({
  text,
  children,
  placement = "top",
}: LiquidTooltipProps) {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const smoothX = useSpring(mouseX, {
    stiffness: 150,
    damping: 18,
  });

  const rotate = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), {
    stiffness: 150,
    damping: 18,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const width = e.currentTarget.offsetWidth;
    mouseX.set(e.nativeEvent.offsetX - width / 2);
  };

  const getPositionClasses = () => {
    switch (placement) {
      case "bottom":
        return "left-1/2 -bottom-20 -translate-x-1/2";
      case "left":
        return "top-1/2 -left-12 -translate-y-1/2";
      case "right":
        return "top-1/2 -right-12 -translate-y-1/2";
      default:
        return "left-1/2 -top-12 -translate-x-1/2";
    }
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        mouseX.set(0);
      }}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: -8,
              transition: { type: "spring", stiffness: 250, damping: 20 },
            }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            style={{ x: smoothX, rotate }}
            className={`absolute z-50
  min-w-[140px]
  px-5 py-2
  text-sm font-medium text-center
  rounded-md
  shadow-md
  bg-neutral-900 text-white
  dark:bg-white dark:text-black
  ${getPositionClasses()}
`}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </span>
  );
}

// "use client";
// import { navbarConfig } from "@/app/config/Navbar";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { LiquidTooltip } from "@/components/liquid-tooltip";
// import Container from "./Container";
// import { ThemeToggleButton } from "./ThemeSwitch";
// export default function Navbar() {
//   const pathname = usePathname();
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
//   return (
//     <Container className="sticky top-2 z-20 px-3 text-sm font-medium   bg-white/60 dark:bg-zinc-900/60 rounded-full shadow-lg shadow-zinc-800/5 backdrop-blur-sm text-zinc-800 dark:text-zinc-200 ring-1 ring-zinc-900/5 dark:ring-white/10">
//       <div className="flex items-center justify-between px-6">
//         <div className="flex items-center gap-4">
//           {navbarConfig.navItems.map((item, index) => {
//             const isActive = pathname === item.href;

//             return (
//               <Link
//                 key={item.label}
//                 href={item.href}
//                 onMouseEnter={() => setHoveredIndex(index)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//                 className="relative rounded-lg px-3 py-2 text-sm font-medium transition-colors"
//               >
//                 {/* Hover pill */}
//                 <AnimatePresence>
//                   {hoveredIndex === index && (
//                     <motion.span
//                       layoutId="nav-hover-pill"
//                       className="pointer-events-none absolute inset-0 rounded-lg bg-zinc-200/60 dark:bg-zinc-800/60"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.15 }}
//                     />
//                   )}
//                 </AnimatePresence>

//                 {/* Text */}
//                 <span
//                   className={`relative z-10 transition-colors ${
//                     isActive
//                       ? "text-teal-500"
//                       : "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
//                   }`}
//                 >
//                   {item.label}
//                 </span>

//                 {isActive && (
//                   <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0" />
//                 )}
//               </Link>
//             );
//           })}
//         </div>

//         {/* <div className="flex items-center gap-4">
//           <ThemeToggleButton variant="qr-scan-left" start="top-right" blur />
//         </div> */}

//         <div className="flex items-center gap-4">
//   <LiquidTooltip text="Toggle Theme" placement="bottom">
//     <ThemeToggleButton
//       variant="qr-scan-left"
//       start="top-right"
//       blur
//     />
//   </LiquidTooltip>
// </div>
//       </div>
//     </Container>
//   );
// }

"use client";

import { navbarConfig } from "@/app/config/Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LiquidTooltip } from "@/components/liquid-tooltip";
import Container from "./Container";
import { ThemeToggleButton } from "./ThemeSwitch";
import { useTheme } from "next-themes";

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const tooltipText = isDark
    ? "Toggle Mode D  "
    : "Toggle Mode N ";

  return (
    <Container className="sticky top-2 z-20 px-3 text-sm font-medium bg-white/60 dark:bg-zinc-900/60 rounded-full shadow-lg shadow-zinc-800/5 backdrop-blur-sm text-zinc-800 dark:text-zinc-200 ring-1 ring-zinc-900/5 dark:ring-white/10">
      <div className="flex items-center justify-between px-6">
        
        {/* Nav Links */}
        <div className="flex items-center gap-4">
          {navbarConfig.navItems.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              >
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="pointer-events-none absolute inset-0 rounded-lg bg-zinc-200/60 dark:bg-zinc-800/60"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </AnimatePresence>

                <span
                  className={`relative z-10 transition-colors ${
                    isActive
                      ? "text-teal-500"
                      : "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </span>

                {isActive && (
                  <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Theme Toggle with Liquid Tooltip */}
        <div className="flex items-center gap-4">
          <LiquidTooltip text={tooltipText} placement="bottom">
            <ThemeToggleButton
              variant="qr-scan-left"
              start="top-right"
              blur
            />
          </LiquidTooltip>
        </div>
      </div>
    </Container>
  );
}

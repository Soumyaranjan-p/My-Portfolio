// import { navbarConfig } from '@/app/config/Navbar';
// import Link from "next/link";

// import Container from './Container';
// import { ThemeToggleButton } from './ThemeSwitch';

// export default function Navbar() {
//   return (
//     <Container className="sticky top-0 z-20 rounded-md py-4 backdrop-blur-sm">
//       <div className="flex items-center justify-between px-6">
//         <div className="flex items-baseline gap-4">
        
//           <div className="flex items-center justify-center gap-4">
//             {navbarConfig.navItems.map((item) => (
//               <Link
//                 className="transition-all duration-300 ease-in-out hover:underline hover:decoration-2 hover:underline-offset-4"
//                 // className="transition-all duration-300 ease-in-out hover:underline hover:decoration-2 hover:underline-offset-4"
//                 key={item.label}
//                 href={item.href}
//               >
//                 {item.label}
            
//               </Link>
//             ))}
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <ThemeToggleButton variant="circle-blur" start="top-right" blur />
//         </div>
//       </div>
//     </Container>
//   );
// }


'use client';

import { navbarConfig } from '@/app/config/Navbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Container className="sticky top-0 z-20 rounded-md py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6">
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
                {/* Hover pill */}
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

                {/* Text */}
                <span
                  className={`relative z-10 transition-colors ${
                    isActive
                      ? 'text-teal-500'
                      : 'text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </span>

        
                {isActive && (
                  <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggleButton variant="circle-blur" start="top-right" blur />
        </div>
      </div>
    </Container>
  );
}

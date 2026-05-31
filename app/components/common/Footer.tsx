// "use client";
// import Link from "next/link";
// import Container from "./Container";
// import { socialLinks } from "@/app/config/Hero";

// const navigateLinks = [
//   { name: "Home", path: "/" },
//   { name: "Work", path: "/work-experience" },
//   { name: "Blog", path: "/blog" },
//   { name: "Resume", path: "/resume" },
//   { name: "Projects", path: "/projects" },
// ];

// export default function Footer() {
//   return (
//     <footer className="border-t border-border">
//       <Container className="py-12">
//         <div className="grid grid-cols-2 gap-8 text-sm">
//           {/* navigate column */}
//           <div>
//             <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
//               Navigate
//             </h3>
//             <ul className="flex flex-col gap-2">
//               {navigateLinks.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     href={link.path}
//                     className="text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* connect column */}
//           <div>
//             <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
//               Connect
//             </h3>
//             <ul className="flex flex-col gap-2">
//               {socialLinks.map((link) => (
//                 <li key={link.name}>
//                   <a
//                     href={link.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {link.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* copyright */}
//         <div className="mt-10 flex justify-between pt-6 border-t border-border">

//           <p className="text-xs text-muted-foreground">
//             &copy; {new Date().getFullYear()} Soumya Ranjan. All rights reserved.
//           </p>
       
//         </div>
//       </Container>
//     </footer>
//   );
// }

"use client";

import Link from "next/link";
import Container from "./Container";
import { socialLinks } from "@/app/config/Hero";

const navigateLinks = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work-experience" },
  { name: "Blog", path: "/blog" },
  { name: "Resume", path: "/resume" },
  { name: "Projects", path: "/projects" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-[#1e1e1e] transition-colors duration-200">
      <Container className="py-0">
        {/* Two-panel body */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr]">
          {/* Navigate */}
          <div className="py-12 md:pr-12 flex flex-col gap-5 border-b border-zinc-200 dark:border-[#1e1e1e] md:border-b-0">
            <h3 className="text-[9px] tracking-[0.24em] uppercase text-neutral-400 dark:text-[#404040] transition-colors duration-200">
              Navigate
            </h3>
            <ul className="flex flex-col">
              {navigateLinks.map((link, i) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="group flex items-center gap-2.5 py-[9px] border-b border-zinc-200 dark:border-[#1e1e1e] last:border-b-0 hover:border-transparent transition-all duration-200 hover:bg-zinc-100/70 dark:hover:bg-[#141414] hover:rounded-md"
                  >
                    <span className="text-[9px] text-neutral-400 dark:text-[#404040] tracking-wide min-w-[18px] transition-colors duration-200">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[13px] tracking-wide text-neutral-900 dark:text-[#e2e2e2] transition-colors duration-200">
                      {link.name}
                    </span>
                    <span className="text-[10px] text-neutral-400 dark:text-[#404040] group-hover:text-neutral-600 dark:group-hover:text-[#737373] group-hover:translate-x-0.5 transition-all duration-200">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block bg-zinc-200 dark:bg-[#1e1e1e] my-10 transition-colors duration-200" />

          {/* Connect */}
          <div className="py-12 md:pl-12 flex flex-col gap-5">
            <h3 className="text-[9px] tracking-[0.24em] uppercase text-neutral-400 dark:text-[#404040] transition-colors duration-200">
              Connect
            </h3>
            <ul className="grid grid-cols-2">
              {socialLinks.map((link, i) => (
                <li
                  key={link.name}
                  className={[
                    "border-b border-zinc-200 dark:border-[#1e1e1e] transition-colors duration-200",
                    i % 2 === 0 ? "border-r border-zinc-200 dark:border-[#1e1e1e] pr-6" : "pl-6",
                    i >= socialLinks.length - 2 ? "border-b-0" : "",
                  ].join(" ")}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-[9px] transition-all duration-200 hover:bg-zinc-100/70 dark:hover:bg-[#141414] hover:rounded-md"
                  >
                    <span className="text-[12px] tracking-wide text-neutral-500 dark:text-[#737373] group-hover:text-neutral-900 dark:group-hover:text-[#e2e2e2] transition-colors duration-200">
                      {link.name}
                    </span>
                    <span className="w-[3px] h-[3px] rounded-full bg-neutral-400 dark:bg-[#404040] group-hover:bg-neutral-600 dark:group-hover:bg-[#737373] transition-colors duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-200 dark:border-[#1e1e1e] flex items-center justify-between py-5 transition-colors duration-200">
          <p className="text-[10px] tracking-[0.08em] text-neutral-400 dark:text-[#404040] transition-colors duration-200">
            &copy; {new Date().getFullYear()} Soumya Ranjan. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
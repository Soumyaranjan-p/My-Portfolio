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
    <footer className="border-t border-zinc-200 dark:border-neutral-900 transition-colors duration-200">
      <Container className="py-0">
        {/* Two-panel body */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr]">
          {/* Navigate */}
          <div className="py-4 md:pr-10 flex flex-col gap-5 border-b border-zinc-200 dark:border-neutral-900 md:border-b-0">
            <h3 className="text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-500 transition-colors duration-200">
              Navigate
            </h3>
            <ul className="flex flex-col">
              {navigateLinks.map((link, i) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="group flex items-center gap-2.5 py-2 border-b border-zinc-200 dark:border-neutral-900 last:border-b-0 hover:border-transparent transition-all duration-200 hover:bg-zinc-100/70 dark:hover:bg-neutral-800 hover:rounded-md"
                  >
                    <span className="text-xs text-neutral-400 dark:text-neutral-500 tracking-widest w-4 transition-colors duration-200">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm tracking-wide text-neutral-900 dark:text-neutral-300 transition-colors duration-200">
                      {link.name}
                    </span>
                    <span className="text-xs text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-600 group-hover:translate-x-0.5 transition-all duration-200">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block bg-zinc-200 dark:bg-neutral-900 my-10 transition-colors duration-200" />

          {/* Connect */}
          <div className="py-12 md:pl-12 flex flex-col gap-5">
            <h3 className="text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-500 transition-colors duration-200">
              Connect
            </h3>
            <ul className="grid grid-cols-2">
              {socialLinks.map((link, i) => (
                <li
                  key={link.name}
                  className={[
                    "border-b border-zinc-200 dark:border-neutral-900 transition-colors duration-200",
                    i % 2 === 0 ? "border-r border-zinc-200 dark:border-neutral-900 pr-6" : "pl-6",
                    i >= socialLinks.length - 2 ? "border-b-0" : "",
                  ].join(" ")}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-2 transition-all duration-200 hover:bg-zinc-100/70 dark:hover:bg-neutral-800 hover:rounded-md"
                  >
                    <span className="text-xs tracking-wide text-neutral-500 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-300 transition-colors duration-200">
                      {link.name}
                    </span>
                    <span className="w-[3px] h-[3px] rounded-full bg-neutral-400 dark:bg-neutral-800 group-hover:bg-neutral-600 dark:group-hover:bg-neutral-600 transition-colors duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-200 dark:border-neutral-900 flex items-center justify-between py-5 transition-colors duration-200">
          <p className="text-xs tracking-widest text-neutral-400 dark:text-neutral-500 transition-colors duration-200">
            &copy; {new Date().getFullYear()} Soumya Ranjan. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
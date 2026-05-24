"use client";

import Link from "next/link";
import Container from "./Container";
import { socialLinks } from "@/app/config/Hero";
import VisitorCount from "../ViewCounter";

const navigateLinks = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work-experience" },
  { name: "Blog", path: "/blog" },
  { name: "Resume", path: "/resume" },
  { name: "Projects", path: "/projects" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-8 text-sm">
          {/* navigate column */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Navigate
            </h3>
            <ul className="flex flex-col gap-2">
              {navigateLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* connect column */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Connect
            </h3>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* copyright */}
        <div className="mt-10 flex justify-between pt-6 border-t border-border">
         
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Soumya Ranjan. All rights reserved.
          </p>
       
        </div>
      </Container>
    </footer>
  );
}

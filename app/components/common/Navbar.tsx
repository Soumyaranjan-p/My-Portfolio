"use client";

import { navbarConfig } from "@/app/config/Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
      <Container className="flex items-center justify-between h-12">
        <div className="flex items-center gap-6">
          {navbarConfig.navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </Container>
    </nav>
  );
}

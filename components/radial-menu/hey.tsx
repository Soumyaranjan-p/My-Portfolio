/**
 * app/page.tsx  –  Demo page for RadialMenu
 *
 * Drop-in for a Next.js 16 App Router project.
 * Install: npm install motion
 */

"use client";

import { RadialMenu } from "@/components/radial-menu/RadialMenu";
import type { RadialMenuItemConfig } from "@/components/radial-menu/types";

// ── Inline SVG icons (no external dependency) ──────────────────────────────
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12L12 3l9 9" />
      <path d="M9 21V12h6v9" />
      <path d="M3 12v9h18v-9" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

// ── Menu items ──────────────────────────────────────────────────────────────
const MENU_ITEMS: RadialMenuItemConfig[] = [
  {
    id: "home",
    icon: <HomeIcon />,
    label: "Home",
    onClick: () => console.log("Home"),
  },
  {
    id: "search",
    icon: <SearchIcon />,
    label: "Search",
    onClick: () => console.log("Search"),
  },
  {
    id: "likes",
    icon: <HeartIcon />,
    label: "Likes",
    onClick: () => console.log("Likes"),
  },
  {
    id: "notifications",
    icon: <BellIcon />,
    label: "Notifications",
    onClick: () => console.log("Notifications"),
  },
  {
    id: "settings",
    icon: <SettingsIcon />,
    label: "Settings",
    onClick: () => console.log("Settings"),
  },
];

// ── Page ───────────────────────────────────────────────────────────────────
export default function hry() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-violet-100 via-white to-sky-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-violet-950">
      {/* Background bokeh blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-700/20" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-sky-300/30 blur-3xl dark:bg-sky-600/15" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-300/20 blur-3xl dark:bg-pink-700/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
          Radial Gooey Menu
        </h1>
        <p className="max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
          Click the button below. Press&nbsp;
          <kbd className="rounded border border-zinc-300 dark:border-zinc-600 px-1.5 py-0.5 text-xs font-mono">
            Esc
          </kbd>{" "}
          or click outside to close.
        </p>

        {/* The menu — floats freely; position it anywhere via className */}
        <RadialMenu
          items={MENU_ITEMS}
          radius={96}
          startAngle={135}
          spreadAngle={162}
        />
      </div>
    </main>
  );
}
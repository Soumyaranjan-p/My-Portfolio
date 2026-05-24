"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const devItems = [
  {
    title: "Gears",
    description: "Tools, devices, and software I use to get work done.",
    href: "/gears",
  },
  {
    title: "Setup",
    description: "VSCode / Cursor configuration and extensions guide.",
    href: "/setup",
  },
  {
    title: "Terminal",
    description: "Zsh, Starship, Fastfetch, and shell configuration.",
    href: "/terminal",
  },
];

export default function Development() {
  return (
    <section className="mb-16">
      <motion.h2
        className="text-lg font-semibold mb-6"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
      >
        Development
      </motion.h2>

      <div className="flex flex-col">
        {devItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            <Link
              href={item.href}
              className="block border border-border rounded-lg px-4 py-3 mb-3 hover:bg-accent/50 transition-colors"
            >
              <h3 className="text-sm font-medium text-green-600 dark:text-green-400">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {item.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { experiences } from "@/app/config/Experience";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Experience() {
  const visible = experiences.slice(0, 3);

  return (
    <section className="mb-10">
      {/* heading */}
      <motion.h2
        className="mb-4 text-lg font-semibold dark:text-zinc-200 text-neutral-900"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
      >
        Experience
      </motion.h2>

      {/* container */}
      <div className="border-t border-zinc-800">
        {visible.map((exp, i) => (
          <motion.div
            key={exp.company}
            className="flex flex-col gap-2 border-b border-zinc-800 py-4 sm:flex-row sm:items-start sm:justify-between"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
          >
            {/* left */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm blur-sm font-medium dark:text-zinc-200 text-neutral-900">
                  {exp.company}
                </h3>

                {exp.isCurrent && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    Working
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {exp.position}
              </p>
            </div>

            {/* right */}
            <div className="shrink-0 text-left sm:text-right">
              <p className="text-sm text-muted-foreground">
                {exp.startDate} — {exp.endDate}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {exp.location}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* button */}
      <div className="mt-6">
        <Link
          href="/work-experience"
          className="inline-block w-fit text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-dashed border-muted-foreground/40 pb-0.5"
        >
          Show all work experiences
        </Link>
      </div>
    </section>
  );
}
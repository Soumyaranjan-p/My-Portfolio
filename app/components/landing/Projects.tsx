'use client';

import { motion } from 'framer-motion';
import { projects } from '@/app/config/Projects';
import { Link } from 'next-view-transitions';

export default function Projects() {

  return (
    <section className="mb-12">
      {/* top divider */}
      <div className="h-px w-full bg-zinc-200 dark:bg-neutral-900" />

      <motion.h2
        className="mt-6 mb-6 text-lg font-semibold text-neutral-900 dark:text-neutral-300"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
      >
        Projects
      </motion.h2>

      {/* project list */}
      <div className="flex flex-col">
        {projects.slice(0, 2).map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            <Link
              href="/projects"
              className="
                group flex items-start justify-between gap-6
                border-b border-zinc-200 dark:border-neutral-900
                py-4 first:border-t
                first:border-zinc-200 dark:first:border-neutral-900
                transition-all duration-200
                hover:bg-zinc-100/70 dark:hover:bg-neutral-800
                hover:-mx-3 hover:px-3
                hover:rounded-md
                hover:border-transparent
              "
            >
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium tracking-tight text-neutral-900 dark:text-neutral-300">
                  {project.title}
                </h3>
                <p className="mt-0.5 line-clamp-1 text-sm text-neutral-500 dark:text-neutral-500">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      className="text-xs px-2 py-1 rounded-md bg-neutral-200 dark:bg-neutral-800"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              <span className="
                flex-shrink-0 self-center whitespace-nowrap
                text-sm font-mono
                text-neutral-400 dark:text-neutral-500
                transition-colors duration-200
                hover:text-zinc-600
                dark:group-hover:text-emerald-500
              ">
                View project →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* show all link */}
      {projects.length > 0 && (
        <div className="mt-6">
          <Link
            href="/projects"
            className="
              inline-block w-fit
              border-b border-dashed
              border-neutral-400/40 dark:border-neutral-600/40
              pb-0.5 text-sm
              text-neutral-500 dark:text-muted-foreground
              transition-colors
              hover:text-neutral-900 dark:hover:text-foreground
            "
          >
            Show all projects
          </Link>
        </div>
      )}

    </section>
  );
}
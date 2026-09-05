'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { projects } from '@/app/config/Projects';
import { Link } from 'next-view-transitions';

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

const mouseX = useMotionValue(-1000);
const mouseY = useMotionValue(-1000);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const thumbnails: string[] = [
    '/assets/spot.png',
    '/assets/pizzaa.png',
  ];

const handleMouseMove = (e: React.MouseEvent) => {
  mouseX.set(e.clientX + 40);
  mouseY.set(e.clientY - 20); 
};

  return (
    <section className="mb-12">
      {/* top divider */}
      <div className="h-px w-full bg-zinc-200 dark:bg-[#1e1e1e]" />

      <motion.h2
        className="mt-6 mb-6 text-lg font-semibold text-neutral-900 dark:text-[#e2e2e2]"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
      >
        Projects
      </motion.h2>

      {/* project list */}
      <div
        ref={containerRef}
        className="flex flex-col"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setActiveIndex(null)}
      >
        {projects.slice(0, 2).map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            onMouseEnter={() => setActiveIndex(i)}
          >
            <Link
              href="/projects"
              className="
                group flex items-start justify-between gap-6
                border-b border-zinc-200 dark:border-[#1e1e1e]
                py-4 first:border-t
                first:border-zinc-200 dark:first:border-[#1e1e1e]
                transition-all duration-200
                hover:bg-zinc-100/70 dark:hover:bg-[#141414]
                hover:-mx-3 hover:px-3
                hover:rounded-md
                hover:border-transparent
              "
            >
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium tracking-[-0.01em] text-neutral-900 dark:text-[#e2e2e2]">
                  {project.title}
                </h3>
                <p className="mt-0.5 line-clamp-1 text-sm text-neutral-500 dark:text-[#737373]">
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
                text-neutral-400 dark:text-[#404040]
                transition-colors duration-200
                hover:text-zinc-600
                dark:group-hover:text-[#22c55e]
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

     {/* cursor-following thumbnail */}
<motion.div
  className="
    fixed top-0 left-0 z-50
    w-[320px] h-[180px]
    rounded-2xl overflow-hidden
    pointer-events-none
    bg-white dark:bg-[#1a1a1a]
    shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)]
    ring-1 ring-black/5 dark:ring-white/10
  "
  style={{
    x: springX,
    y: springY,
    transformOrigin: 'top left',
  }}
  animate={{
    scale: activeIndex !== null ? 1 : 0.85,
    opacity: activeIndex !== null ? 1 : 0,
  }}
  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
>
  <motion.div
    className="flex flex-col w-full"
    style={{ height: `${thumbnails.length * 220}px` }}
    animate={{
      y: activeIndex !== null ? -(activeIndex * 220) : 0,
    }}
    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
  >
    {thumbnails.map((src, i) => (
      <div key={i} className="w-full shrink-0" style={{ height: '220px' }}>
        {src ? (
          <img src={src} alt={`project ${i + 1}`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-neutral-200 dark:bg-[#252525] flex items-center justify-center">
            <span className="text-xs text-neutral-400 dark:text-neutral-600">image {i + 1}</span>
          </div>
        )}
      </div>
    ))}
  </motion.div>
</motion.div>
    </section>
  );
}
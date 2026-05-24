"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPostPreview } from "@/app/types/blog";

interface BlogProps {
  posts: BlogPostPreview[];
}

export default function Blog({ posts }: BlogProps) {
  return (
    
    <section className="mb-0">
  {/* top divider */}
  <div className="h-px w-full bg-zinc-200 dark:bg-[#1e1e1e]" />

  <motion.h2
    className="mt-6 mb-6 text-lg font-semibold text-neutral-900 dark:text-[#e2e2e2]"
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35 }}
  >
    Blog
  </motion.h2>

  {/* blog list */}
  <div className="flex flex-col">
    {posts.map((post, i) => (
      <motion.div
        key={post.slug}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: i * 0.08 }}
      >
        <Link
          href={`/blog/${post.slug}`}
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
          {/* left */}
          <div className="min-w-0 flex-1">
            <h3
              className="
                text-sm font-medium tracking-[-0.01em]
                text-neutral-900 dark:text-[#e2e2e2]
              "
            >
              {post.frontmatter.title}
            </h3>

            <p
              className="
                mt-0.5 line-clamp-1 text-sm
                text-neutral-500 dark:text-[#737373]
              "
            >
              {post.frontmatter.description}
            </p>

            <p
              className="
                mt-1 text-xs font-mono
                text-neutral-400 dark:text-[#404040]
              "
            >
              📅 {post.frontmatter.date}
            </p>
          </div>

          {/* right */}
          <span
            className="
              flex-shrink-0 self-center whitespace-nowrap
              text-sm font-mono
              text-neutral-400 dark:text-[#404040]

              transition-colors duration-200
              hover:text-zinc-600
              dark:group-hover:text-[#22c55e]
            "
          >
            Read more →
          </span>
        </Link>
      </motion.div>
    ))}
  </div>

  {/* button */}
  {posts.length > 0 && (
    <div className="mt-6">
      <Link
        href="/blog"
        className="
          inline-block w-fit
          border-b border-dashed
          border-neutral-400/40 dark:border-neutral-600/40
          pb-0.5
          text-sm
          text-neutral-500 dark:text-muted-foreground
          transition-colors
          hover:text-neutral-900 dark:hover:text-foreground
        "
      >
        Show all blogs
      </Link>
    </div>
  )}
  
</section>
  );
}

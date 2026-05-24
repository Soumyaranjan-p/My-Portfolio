import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BlogFrontmatter } from "@/app/types/blog";
import rehypeHighlight from "@shikijs/rehype";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import React, { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";

/* ----------------------------------
   MDX Components (DEFINED ONCE)
----------------------------------- */
const BlogComponents: MDXComponents = {
  img: ({ src, alt, ...props }: ComponentPropsWithoutRef<"img">) => {
    if (typeof src !== "string") return null;

    return (
      <div className="relative my-8 overflow-hidden rounded-lg border border-border/40">
        <Image
          src={src}
          alt={alt ?? ""}
          {...props}
          width={800}
          height={400}
          className="mx-auto object-cover"
        />
      </div>
    );
  },
};

/* ----------------------------------
   Types
----------------------------------- */
interface BlogContentProps {
  frontmatter: BlogFrontmatter;
  content: string;
}

/* ----------------------------------
   Component
----------------------------------- */
export function BlogContent({ frontmatter, content }: BlogContentProps) {
  const { title, description, image, tags, date } = frontmatter;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto max-w-2xl">
      {/* Hero Section */}
      <header className="mb-8 space-y-5">
        {image && (
          <div className="relative aspect-video overflow-hidden rounded-lg border border-border/40">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="capitalize text-xs font-normal px-2 py-0.5 border-border/80 text-muted-foreground shadow-none"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-2xl font-bold leading-tight sm:text-3xl tracking-tight">
            {title}
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed">{description}</p>

          <div className="text-xs text-muted-foreground pt-1 flex items-center gap-1.5">
            <span>Published on</span>
            <time dateTime={date} className="font-medium text-foreground">{formattedDate}</time>
          </div>
        </div>

        <Separator className="bg-muted/40" />
      </header>

      {/* MDX Content */}
      <div className="prose prose-neutral max-w-none dark:prose-invert leading-relaxed text-sm sm:text-base">
        <MDXRemote
          source={content}
          components={BlogComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [[rehypeHighlight, { theme: "github-dark" }]],
            },
          }}
        />
      </div>
    </article>
  );
}

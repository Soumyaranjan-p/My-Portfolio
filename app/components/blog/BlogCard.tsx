import { BlogPostPreview } from "@/app/types/blog";
import { Link } from "next-view-transitions";

interface BlogCardProps {
  post: BlogPostPreview;
}

export function BlogCard({ post }: BlogCardProps) {
  const { slug, frontmatter } = post;
  const { title, description, date } = frontmatter;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-muted/50 last:border-0">
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
          {description}
        </p>
        <time className="text-xs text-muted-foreground mt-1.5 block" dateTime={date}>
          📅 {formattedDate}
        </time>
      </div>
      <Link
        href={`/blog/${slug}`}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0 flex items-center gap-1 self-start sm:self-center"
      >
        Read more <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

import { BlogPostPreview } from "@/app/types/blog";
import { BlogCard } from "./BlogCard";

interface BlogListProps {
  posts: BlogPostPreview[];
  className?: string;
}

export function BlogList({ posts, className = "" }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-xl font-semibold">No blog posts found</h2>
        <p className="text-muted-foreground text-sm">
          Check back later for new content!
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

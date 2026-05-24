'use client';

import { BlogList } from '@/app/components/blog/BlogList';
import Container from '@/app/components/common/Container';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useHapticFeedback } from '@/app/hooks/use-haptic-feedback';
import { BlogPostPreview } from '@/app/types/blog';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BlogPageClientProps {
  initialPosts: BlogPostPreview[];
  initialTags: string[];
}

const getBlogPostsByTagClient = (
  posts: BlogPostPreview[],
  tag: string,
): BlogPostPreview[] => {
  return posts.filter((post) =>
    post.frontmatter.tags.some(
      (postTag) => postTag.toLowerCase() === tag.toLowerCase(),
    ),
  );
};

export function BlogPageClient({
  initialPosts,
  initialTags,
}: BlogPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { triggerHaptic, isMobile } = useHapticFeedback();

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  // Get tag from URL params on mount
  useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      setSelectedTag(tagParam);
      const filtered = getBlogPostsByTagClient(initialPosts, tagParam);
      setFilteredPosts(filtered);
    } else {
      setSelectedTag(null);
      setFilteredPosts(initialPosts);
    }
  }, [searchParams, initialPosts]);

  // Handle tag click
  const handleTagClick = (tag: string) => {
    if (isMobile()) {
      triggerHaptic('light');
    }

    if (selectedTag === tag) {
      setSelectedTag(null);
      setFilteredPosts(initialPosts);
      router.replace('/blog');
    } else {
      setSelectedTag(tag);
      const filtered = getBlogPostsByTagClient(initialPosts, tag);
      setFilteredPosts(filtered);
      router.replace(`/blog?tag=${encodeURIComponent(tag)}`);
    }
  };

  const getTagPostCount = (tag: string) => {
    return initialPosts.filter((post) =>
      post.frontmatter.tags.some(
        (postTag) => postTag.toLowerCase() === tag.toLowerCase(),
      ),
    ).length;
  };

  return (
    <Container className="py-16">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold tracking-tight">
            Blogs
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Thoughts, tutorials, and insights on engineering, programming, and technology.
          </p>
        </div>

        <Separator className="bg-muted/40" />

        {/* Tags */}
        {initialTags.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Filter by Tag</h2>
              {selectedTag && (
                <button
                  onClick={() => handleTagClick(selectedTag)}
                  className="text-xs text-muted-foreground hover:text-foreground underline cursor-pointer"
                >
                  Clear filter
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {initialTags.map((tag) => {
                const postCount = getTagPostCount(tag);
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="transition-colors cursor-pointer"
                  >
                    <Badge
                      variant={isSelected ? 'default' : 'outline'}
                      className="capitalize cursor-pointer text-xs py-0.5 px-2 hover:bg-accent hover:text-accent-foreground border-border/80 shadow-none font-normal"
                    >
                      {tag} ({postCount})
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Blog Posts */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {selectedTag ? `Posts tagged "${selectedTag}"` : 'Latest Posts'}
              {filteredPosts.length > 0 && (
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  ({filteredPosts.length}{' '}
                  {filteredPosts.length === 1 ? 'post' : 'posts'})
                </span>
              )}
            </h2>
          </div>

          <BlogList posts={filteredPosts} />
        </div>
      </div>
    </Container>
  );
}

import { BlogContent } from '@/app/components/blog/BlogContent';
import { BlogList } from '@/app/components/blog/BlogList';
import Container from '@/app/components/common/Container';
import FontSizeControls from '@/app/components/common/FontSizeControls';
import ArrowLeft from '@/app/components/svgs/ArrowLeft';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/app/config/Meta';
import {
  getBlogPostBySlug,
  getBlogPostSlugs,
  getRelatedPosts,
} from '@/app/lib/blog';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getBlogPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) {
    return {
      title: 'Post Not Found',
    };
  }

  const { title, description, image } = post.frontmatter;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) {
    notFound();
  }
  const relatedPosts = await getRelatedPosts(slug, 3);

  return (
    <>
      <Container className="py-16">
        <div className="space-y-10">
          {/* Back Button */}
          <div>
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Blog</span>
            </Link>
          </div>

          {/* Blog Content */}
          <BlogContent frontmatter={post.frontmatter} content={post.content} />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="space-y-6 pt-4">
              <Separator className="bg-muted/40" />
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Related Posts</h2>
                <BlogList posts={relatedPosts} />
              </div>
            </div>
          )}

          {/* Back to Blog CTA */}
          <div className="text-center pt-6">
            <Separator className="mb-8 bg-muted/40" />
            <Link 
              href="/blog"
              className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-dashed border-muted-foreground/40 pb-0.5"
            >
              View all blog posts
            </Link>
          </div>
        </div>
      </Container>
      <FontSizeControls />
    </>
  );
}

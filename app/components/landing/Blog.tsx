import { getPublishedBlogPosts } from '@/app/lib/blog';
import { Link } from 'next-view-transitions';

import { BlogCard } from '../blog/BlogCard';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';

import AnimatedButton from '@/components/ui/animated-button';

export default function Blog() {
  const posts = getPublishedBlogPosts();

  return (
    <Container className="mt-20">
      <SectionHeading subHeading="Featured" heading="Blogs" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {posts.slice(0, 2).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <AnimatedButton >
          <Link href="/blog">View More</Link>
        </AnimatedButton>
      </div>
    </Container>
  );
}

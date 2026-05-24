import Container from "../app/components/common/Container";
import Hero from "./components/landing/Hero";
import Experience from "./components/landing/Experience";
import Blog from "./components/landing/Blog";

import { getPublishedBlogPosts } from "./lib/blog";
import Projects from "./components/landing/Projects";

export const dynamic = "force-dynamic";

export default function Home() {


// Replace with:
let posts: ReturnType<typeof getPublishedBlogPosts> = [];
  try {
    posts = getPublishedBlogPosts().slice(0, 3);
  } catch (error) {
    console.error("Failed to load blog posts for landing page:", error);
  }

  return (
    <Container>
      <Hero />
      <Experience />
      <Projects />
      <Blog posts={posts} />
      {/* <Development />
      <Personal /> */}
    </Container>
  );
}

import Work from "@/app/components/landing/Projects";
import Container from "../app/components/common/Container";
import Hero from "./components/landing/Hero";
//  import Experience from "./components/landing/Experience";
import About from "./components/landing/About";
import Blog from "./components/landing/Blog";
// import Skills from "./components/landing/Skills";
import TechStackMarquee from "./components/common/Tech-marquee";

export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <Container className="min-h-screen py-16">
      <Hero />
      {/* <Experience /> */}
      <Work />

   <TechStackMarquee />
      <About />
      <Blog />
    </Container>
  );
}

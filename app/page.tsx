
import Container from "../app/components/common/Container";
import Hero from "./components/landing/Hero";
 import Experience from "./components/landing/Experience";

export default function Home() {
  return (
   

    <Container className="min-h-screen py-16">

             <Hero />
             <Experience />
      
    </Container>
  );
}

import Image from "next/image";
import Container from "../app/components/common/Container";
import Hero from "./components/landing/Hero";


export default function Home() {
  return (
   

    <Container className="min-h-screen py-16">

             <Hero />
      
    </Container>
  );
}

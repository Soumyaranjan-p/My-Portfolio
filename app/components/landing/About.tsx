"use client"
import { about, mySkills } from '@/app/config/About';
import Image from 'next/image';

import { motion } from "framer-motion";
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function About() {
  return (
    <Container className="mt-20">
      <SectionHeading subHeading="About" heading="Me" />
      {/* About me */}
      <motion.div
      initial={{ opacity: 0, y: 20 }}
animate={{
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: "easeOut"
  }
}}
whileHover={{
  scale: 1.05,
  y: -4,
  boxShadow: "0px 12px 32px rgba(0,0,0,0.12)",
  transition: { duration: 0.25 }
}}
whileTap={{
  scale: 0.97
}}


       className="mt-8 flex flex-col gap-4 md:flex-row">
        <Image
          src="/assets/logo-t.png"
          alt="About"
          width={100}
          height={100}
          className="border-secondary size-60 rounded-md border-2 bg-blue-300 dark:bg-red-600"
        />
        <div className="mt-8">
          <h3 className="text-2xl font-bold">{about.name}</h3>
          <p className="text-secondary mt-6">{about.description}</p>
         
        </div>
      </motion.div>
    </Container>
  );
}

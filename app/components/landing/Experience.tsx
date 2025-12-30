"use client";

import { type Experience, experiences } from '@/app/config/Experience';
import { Link } from 'next-view-transitions';
import { motion } from 'framer-motion';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { ExperienceCard } from '@/app/experience/ExperienceCard';

import AnimatedButton from '@/components/ui/animated-button';

// 1. Staggered Entrance for the list
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

//  Cinematic Entrance for individual cards
// Uses a blur filter + subtle scale for that "Apple-style" focus effect
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    scale: 0.96,
    filter: "blur(4px)" 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      mass: 1,
      stiffness: 95,
      damping: 20,
    },
  },
};

export default function Experience() {
  return (
    <Container className="mt-20">
      <SectionHeading subHeading="Featured" heading="Experience" />
      
      {/* Animation Container */}
      <motion.div 
        className="mt-4 flex flex-col gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }} // Triggers slightly before element hits center
        variants={containerVariants}
      >
        {experiences.slice(0, 2).map((experience: Experience) => (
          <motion.div
            key={experience.company}
            variants={cardVariants}
            className="group relative z-0" // relative for positioning the bloom
            whileHover={{
              scale: 1.02,
              y: -4,
              rotate: 0.5, // Extremely subtle rotation for 3D feel
              transition: { duration: 0.2, ease: "easeInOut" }
            }}
          >
            {/* Ambient Shadow Bloom */}
            {/* This creates the soft glow behind the card on hover */}
            <div 
              className="absolute -inset-2 -z-10 rounded-xl  opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" 
              aria-hidden="true"
            />

            {/* Card Wrapper to ensure background opacity doesn't break bloom */}
            <div className="relative z-10 rounded-xl bg-background/80 backdrop-blur-sm transition-colors">
              <ExperienceCard experience={experience} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Button Animation */}
      <motion.div 
        className="mt-8 flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <AnimatedButton variant="outline" asChild>
          <Link href="/work-experience" >Show all work experiences</Link>
        </AnimatedButton>
      </motion.div>
    </Container>
  );
}
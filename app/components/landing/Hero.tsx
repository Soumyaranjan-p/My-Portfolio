
"use client";
import { useScatterHover } from "@/app/hooks/useScatterHover";
import { heroConfig, skillComponents, socialLinks } from "@/app/config/Hero";
import { parseTemplate } from "@/app/lib/hero";
import { cn } from "@/app/lib/utils";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { motion, Variants } from "framer-motion"; 

import Container from "../common/Container";
import Skill from "../common/Skill";
import CV from "../svgs/CV";
import Chat from "../svgs/Chat";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSound } from "@/app/hooks/use-sound";
import SpotifyStatus from "../SpotifyStatus";
import { FlipSentences } from "../common/flip-sentences";

const buttonIcons = {
  CV: CV,
  Chat: Chat,
};

//  FIXED: Single, properly typed variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,  // Required const assertion
      bounce: 0,
      duration: 0.7,
    },
  },
};

export default function Hero() {
  const { setRef, onEnter, onLeave } = useScatterHover();
  const { name, title, icons, avatar, skills, description, buttons } = heroConfig;
  const playSound = useSound("/audio/name.mp3");

  const renderDescription = () => {
    const parts = parseTemplate(description.template, skills);

    return parts.map((part) => {
      if (part.type === "skill" && "skill" in part && part.skill) {
        const SkillComponent =
          skillComponents[part.skill.component as keyof typeof skillComponents];
        return (
          <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
            <SkillComponent />
          </Skill>
        );
      } else if (part.type === "bold" && "text" in part) {
        return (
          <b key={part.key} className="whitespace-pre-wrap text-primary">
            {part.text}
          </b>
        );
      } else if (part.type === "text" && "text" in part) {
        return (
          <span key={part.key} className="whitespace-pre-wrap">
            {part.text}
          </span>
        );
      }
      return null;
    });
  };

  return (
    <Container className="mx-auto max-w-5xl">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {/* 1. Image */}
      <motion.div
  whileHover={{
    x: [-4, 4, -6, 6, -4, 4],
    rotate: [-3, 3, -5, 5, -3, 3],
  }}
  transition={{
    duration: 0.12,
    repeat: Infinity,
    ease: "linear",
  }}
  className="relative flex shrink-0 overflow-hidden rounded-xl
    border-neutral-300/60 dark:border-white/20
    bg-neutral-200 size-24 border p-1"
  style={{ willChange: "transform" }}
>
  <Image
    src={avatar}
    alt="hero"
    width={100}
    height={100}
    className="aspect-square rounded-md h-full w-full"
  />
</motion.div>

        {/* 2. Text Area (Title & Description) */}
        <div className="mt-8 flex flex-col gap-1">
          <motion.div variants={itemVariants}>
           <h1 className="text-5xl font-bold flex items-center"
             onMouseEnter={onEnter}
  onMouseLeave={onLeave}
  >
             {name.split("").map((char, i) => (
    <span
      key={i}
      ref={setRef}
      className="inline-block will-change-transform"
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ))}
              
              <motion.span
                className="text-secondary ml-2 pt-1 font-bold cursor-pointer"
                onClick={playSound}
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                {icons}
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <FlipSentences
              className="font-extrabold md:text-base dark:text-zinc-200 text-neutral-900"
              interval={2}
              variants={{
                initial: { y: -8, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                exit: { y: 8, opacity: 0 },
              }}
            >
              <span>21 Years Old</span>
              <span>Built to be read. Designed to last.</span>
              <span>Clean code looks like someone cares.</span>
            </FlipSentences>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-base md:text-lg text-neutral-500 whitespace-pre-wrap"
          >
            {renderDescription()}
          </motion.div>
        </div>

        {/* 3. Buttons */}
        <motion.div variants={itemVariants} className="mt-8 flex gap-4">
          {buttons.map((button, index) => {
            const IconComponent = buttonIcons[button.icon as keyof typeof buttonIcons];
            return (
              <Button
                key={index}
                variant={button.variant as "outline" | "default"}
                asChild
                className={cn(
                  button.variant === "outline" && "inset-shadow-indigo-500",
                  button.variant === "default" && "inset-shadow-indigo-500"
                )}
              >
                <Link href={button.href} className="flex items-center gap-2">
                  {IconComponent && <IconComponent />}
                  {button.text}
                </Link>
              </Button>
            );
          })}
        </motion.div>

        {/* 4. Social Links */}
        <motion.div variants={itemVariants} className="mt-8 flex gap-2">
          {socialLinks.map((link) => (
            <Tooltip key={link.name} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary flex items-center gap-2 transition-transform hover:scale-110"
                >
                  <span className="size-6">{link.icon}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </motion.div>

        {/* 5. Spotify Status */}
        <motion.div variants={itemVariants}>
          <SpotifyStatus />
        </motion.div>
      </motion.div>
    </Container>
  );
}

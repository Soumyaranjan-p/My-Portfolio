"use client";

import { heroConfig, socialLinks } from "@/app/config/Hero";
import { useScrambleText } from "@/app/hooks/useScrambletext";
import { cn } from "@/app/lib/utils";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import Container from "../common/Container";
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

/* =======================
   FRAMER MOTION VARIANTS
======================= */

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
      type: "spring",
      bounce: 0,
      duration: 0.7,
    },
  },
};

/* =======================
          HERO
======================= */

export default function Hero() {
  /* GSAP TEXT REF */
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  /* SCRAMBLE TEXT */
  const { setRef, onEnter, onLeave } = useScrambleText();

  /* CONFIG */
  const { description, name, icons, avatar, buttons } = heroConfig;

  /* SOUND */
  const playSound = useSound("/audio/name.mp3");

  /* =======================
     GSAP TEXT FLIP EFFECT
  ======================= */

  useEffect(() => {
    if (!titleRef.current) return;

    const chars =
      titleRef.current.querySelectorAll<HTMLSpanElement>(".char");

    gsap.set(chars, {
      transformStyle: "preserve-3d",
    });

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.3,
    });

    tl.fromTo(
      chars,
      {
        rotateX: 180,
        opacity: 0,
        filter: "blur(10px)",
        transformOrigin: "50% 50% -20px",
      },
      {
        rotateX: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
        stagger: {
          each: 0.06,
          from: "start",
        },
      }
    );

    return () => {
      tl.kill();
    };
  }, [name]);

  /* =======================
           JSX
  ======================= */

  return (
    <Container className="mx-auto max-w-5xl">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {/* 1. IMAGE */}
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

        {/* 2. TEXT AREA */}
        <div className="mt-8 flex flex-col gap-1">
          {/* NAME */}
          <h1
            ref={titleRef}
            className="text-5xl flex items-center font-bold "
          >
            {name.split("").map((char, i) => (
              <span
                key={i}
                className="char inline-block will-change-transform"
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

          {/* FLIP SENTENCES */}
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

          {/* DESCRIPTION (SCRAMBLE) */}
          <motion.div
            variants={itemVariants}
            className="mt-2 font-extrabold flex flex-wrap items-center text-3xl md:text-lg
              text-zinc-900 hover:text-indigo-400 hover:dark:text-[#22D3EE]
              transition-colors dark:text-zinc-200 whitespace-pre-wrap"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            {description.split("").map((char, i) => (
              <span
                key={i}
                ref={setRef}
                className="inline-block will-change-transform"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </motion.div>
        </div>

        {/* 3. BUTTONS */}
        <motion.div variants={itemVariants} className="mt-8 flex gap-4">
          {buttons.map((button, index) => {
            const IconComponent =
              buttonIcons[button.icon as keyof typeof buttonIcons];

            return (
              <Button
                key={index}
                variant={button.variant as "outline" | "default"}
                asChild
                className={cn(
                  "mt-3",
                  button.variant === "outline" && "inset-shadow-indigo-500",
                  button.variant === "default" && "inset-shadow-indigo-500"
                )}
              >
                <Link
                  href={button.href}
                  className="font-custom2 text-neutral-700 dark:text-neutral-300
                    px-4 py-1.75 text-sm inline-block
                    bg-neutral-100 dark:bg-neutral-900
                    border-dashed border-neutral-300 dark:border-neutral-700 border"
                >
                  {IconComponent && <IconComponent />}
                  {button.text}
                </Link>
              </Button>
            );
          })}
        </motion.div>

        {/* 4. SOCIAL LINKS */}
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

        {/* 5. SPOTIFY */}
        <motion.div variants={itemVariants}>
          <SpotifyStatus />
        </motion.div>
      </motion.div>
    </Container>
  );
}

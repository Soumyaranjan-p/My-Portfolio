"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { heroConfig, socialLinks } from "@/app/config/Hero";
import { FlipSentences } from "../common/flip-sentences";

import NowPlaying from "../Nowplaying";

export default function Hero() {
  return (
    <section className="mb-6">
      {/* profile row */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative shrink-0 size-20 rounded-xl overflow-hidden border border-border bg-muted">
          <Image
            src={heroConfig.avatar}
            alt={heroConfig.name}
            width={80}
            height={80}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div>
          <h1 className="text-xl font-semibold">{heroConfig.name}</h1>
           <FlipSentences
              className="font-extrabold md:text-base dark:text-zinc-200 text-neutral-900"
              interval={2}
              variants={{
                initial: { y: -8, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                exit: { y: 8, opacity: 0 },
              }}
            >
              <span>22 Years Old</span>
              <span>Built to be read. Designed to last.</span>
              <span>Clean code looks like someone cares.</span>
            </FlipSentences>
        </div>
      </motion.div>

      {/* bio */}
      <motion.span
        className="mt-5 text-sm text-muted-foreground leading-relaxed"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {heroConfig.description}
      </motion.span>
       {/* SPOTIFY SECTIONS */}
      <motion.p
        className="mt-5 text-sm text-muted-foreground leading-relaxed"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
         <NowPlaying />
      </motion.p>

      {/* social icons */}
      <motion.div
        className="mt-5 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {socialLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={link.name}
          >
            <span className="w-4 h-4 block">{link.icon}</span>
          </Link>
         
        ))}
    
     
      </motion.div>
      
    </section>
  );
}

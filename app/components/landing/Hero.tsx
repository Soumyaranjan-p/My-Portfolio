'use client';

import { heroConfig, skillComponents, socialLinks } from '@/app/config/Hero';
import { parseTemplate } from '@/app/lib/hero';
import { cn } from '@/app/lib/utils';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { motion } from 'framer-motion';

import Container from '../common/Container';
import Skill from '../common/Skill';
import CV from '../svgs/CV';
import Chat from '../svgs/Chat';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useSound } from '@/app/hooks/use-sound';
import SpotifyStatus from '../SpotifyStatus';

const buttonIcons = {
  CV: CV,
  Chat: Chat,
};

//  Animation Configurations
// The parent container orchestrates the timing
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Delay between each section appearing
      delayChildren: 0.1,
    },
  },
};

// The child elements slide up, fade in, and un-blur
const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    filter: 'blur(10px)' // Cinematic focus effect
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { 
      type: 'spring', 
      bounce: 0,
      duration: 0.7 
    }
  },
};

export default function Hero() {
  const { name, title, icons, avatar, skills, description, buttons } = heroConfig;

  // load the audio file
  const playSound = useSound('/audio/name.mp3'); 

  const renderDescription = () => {
    const parts = parseTemplate(description.template, skills);

    return parts.map((part) => {
      if (part.type === 'skill' && 'skill' in part && part.skill) {
        const SkillComponent =
          skillComponents[part.skill.component as keyof typeof skillComponents];
        return (
          <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
            <SkillComponent />
          </Skill>
        );
      } else if (part.type === 'bold' && 'text' in part) {
        return (
          <b key={part.key} className="whitespace-pre-wrap text-primary">
            {part.text}
          </b>
        );
      } else if (part.type === 'text' && 'text' in part) {
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
        whileInView="visible" // Triggers animation when scrolled into view
        viewport={{ once: true, margin: "-50px" }} // Ensures it plays only once
        variants={containerVariants}
      >
        
        {/* 1. Image */}
        <motion.div variants={itemVariants}>
          <Image
            src={avatar}
            alt="hero"
            width={100}
            height={100}
            className="size-24 rounded-full dark:bg-yellow-300 bg-blue-300 object-cover"
          />
        </motion.div>

        {/* 2. Text Area (Title & Description) */}
        <div className="mt-8 flex flex-col gap-2">
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold flex items-center">
              Hi, I&apos;m {name}
              <motion.span
                className="text-secondary ml-2 pt-1 font-bold cursor-pointer"
                onClick={playSound}
                whileHover={{ scale: 1.1, rotate: 10 }} // Subtle interaction for the speaker icon
                whileTap={{ scale: 0.9 }}
              >
                {icons}
              </motion.span>
            </h1>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-base md:text-lg text-neutral-500 whitespace-pre-wrap"
          >
            {renderDescription()}
          </motion.div>
        </div>

        {/* 3. Buttons */}
        <motion.div 
          variants={itemVariants} 
          className="mt-8 flex gap-4"
        >
          {buttons.map((button, index) => {
            const IconComponent =
              buttonIcons[button.icon as keyof typeof buttonIcons];
            return (
              <Button
                key={index}
                variant={button.variant as 'outline' | 'default'}
                asChild
                className={cn(
                  button.variant === 'outline' && 'inset-shadow-indigo-500',
                  button.variant === 'default' && 'inset-shadow-indigo-500'
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
        <motion.div 
          variants={itemVariants} 
          className="mt-8 flex gap-2"
        >
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
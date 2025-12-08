'use client';

import { heroConfig, skillComponents, socialLinks } from '@/app/config/Hero';
import { parseTemplate } from '@/app/lib/hero';
import { cn } from '@/app/lib/utils';
import { Link } from 'next-view-transitions';
import Image from 'next/image';

import Container from '../common/Container';
import Skill from '../common/Skill';
import CV from '../svgs/CV';
import Chat from '../svgs/Chat';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useSound } from '@/app/hooks/use-sound' 
import SpotifyStatus from '../SpotifyStatus';

const buttonIcons = {
  CV: CV,
  Chat: Chat,
};

export default function Hero() {
  const { name, title, icons, avatar, skills, description, buttons } =
    heroConfig;

  // 🔊 load the audio file
  const playSound = useSound('/audio/name.mp3'); // <-- your sound

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
      {/* Image */}
      <Image
        src={avatar}
        alt="hero"
        width={100}
        height={100}
        className="size-24 rounded-full dark:bg-yellow-300 bg-blue-300"
      />

      {/* Text Area */}
      <div className="mt-8 flex flex-col gap-2">
        <h1 className="text-4xl font-bold flex">
          Hi, I&apos;m {name}
 <span
   className="text-secondary ml-2 pt-3 font-bold cursor-pointer"
    onClick={playSound} 
 >
    {icons}
 </span>
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-base md:text-lg text-neutral-500 whitespace-pre-wrap">
          {renderDescription()}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        {buttons.map((button, index) => {
          const IconComponent =
            buttonIcons[button.icon as keyof typeof buttonIcons];
          return (
            <Button
              key={index}
              variant={button.variant as 'outline' | 'default'}
              className={cn(
                button.variant === 'outline' && 'inset-shadow-indigo-500',
                button.variant === 'default' && 'inset-shadow-indigo-500'
              )}
            >
              {IconComponent && <IconComponent />}
              <Link href={button.href}>{button.text}</Link>
            </Button>
          );
        })}
      </div>

      {/* Social Links */}
     <div className="mt-8 flex gap-2">
  {socialLinks.map((link) => (
    <Tooltip key={link.name} delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={link.href}
          target="_blank"               // <- open in new tab
          rel="noopener noreferrer"     // <- security best practice
          className="text-secondary flex items-center gap-2"
        >
          <span className="size-6">{link.icon}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{link.name}</p>
      </TooltipContent>
    </Tooltip>
  ))}
</div>

  <SpotifyStatus />

    </Container>
  );
}

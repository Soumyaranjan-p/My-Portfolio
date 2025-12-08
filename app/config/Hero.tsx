import { Volume } from 'lucide-react';
import Github from '@/app/components/svgs/Github';
import LinkedIn from '@/app/components/svgs/LinkedIn';
import Mail from '@/app/components/svgs/Mail';
import X from '@/app/components/svgs/X';
// Technology Components
import TypeScript from '@/app/components/techs/TypeScript';
import JavaScript from '@/app/components/techs/JavaScript';
import MongoDB from '../components/techs/MongoDB';
import NextJs from '@/app/components/techs/NextJs';

import NodeJs from '@/app/components/techs/NodeJs';
import ReactIcon from '@/app/components/techs/ReactIcon';

//Component mapping for skills
export const skillComponents = {
  TypeScript: TypeScript,
  ReactIcon: ReactIcon,
  NextJs: NextJs,
  NodeJs: NodeJs,
  MongoDB: MongoDB,
  JavaScript: JavaScript,
};

export const heroConfig = {
  // Personal Information
  name: 'Soumya Ranjan',
  title: 'A Full Stack web developer',
  icons:<Volume />,
  avatar: '/assets/logo.png',

  // Skills Configuration
  skills: [
    {
      name: 'Typescript',
      href: 'https://www.typescriptlang.org/',
      component: 'TypeScript',
    },
    {
      name: 'React',
      href: 'https://react.dev/',
      component: 'ReactIcon',
    },
    {
      name: 'Next.js',
      href: 'https://nextjs.org/',
      component: 'NextJs',
    },
    {
      name: 'NodeJs',
      href: 'https://nodejs.org/',
      component: 'NodeJs',
    },
    {
      name: 'MongoDB',
      href: 'https://www.mongodb.com/',
      component: 'MongoDB',
    },
  ],

  // Description Configuration
  description: {
    template:
      'I build interactive web apps using {skills:0}, {skills:1}, {skills:2}, {skills:3} and {skills:4}. With a focus on <b>UI</b> design. Enthusiastic about <b>Framer Motion</b>, driven by a keen eye for design.',
  },

  // Buttons Configuration
  buttons: [
    {
      variant: 'outline',
      text: 'Resume / CV',
      href: '/resume',
      icon: 'CV',
    },
    {
      variant: 'default',
      text: 'Get in touch',
      href: '/contact',
      icon: 'Chat',
    },
  ],
};

// Social Links Configuration
export const socialLinks = [
  {
    name: 'X',
    href: 'https://x.com/soumya_ai',
    icon: <X />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/soumya-ranjan-parida-44b71b286/',
    icon: <LinkedIn />,
  },
  {
    name: 'Github',
    href: 'https://github.com/Soumyaranjan-p',
    icon: <Github />,
  },
  {
    name: 'Email',
    href: 'mailto:ranjanparidasoumya04@gmail.com',
    icon: <Mail />,
  },
];

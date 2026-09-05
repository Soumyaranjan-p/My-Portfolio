import Appwrite from '@/app/components/techs/Appwrite';

import ExpressJs from '@/app/components/techs/ExpressJs';
import Github from '@/app/components/techs/Github';
import MDXIcon from '@/app/components/techs/MDXIcon';
import MongoDB from '@/app/components/techs/MongoDB';
import Motion from '@/app/components/techs/Motion';
import Netlify from '@/app/components/techs/Netlify';
import NextJs from '@/app/components/techs/NextJs';
import NodeJs from '@/app/components/techs/NodeJs';
import PostgreSQL from '@/app/components/techs/PostgreSQL';
import Prisma from '@/app/components/techs/Prisma';
import ReactIcon from '@/app/components/techs/ReactIcon';
import ConvexIcon from '@/app/components/techs/Convex';
import Sanity from '@/app/components/techs/Sanity';
import Shadcn from '@/app/components/techs/Shadcn';
import SocketIo from '@/app/components/techs/SocketIo';
import TailwindCss from '@/app/components/techs/TailwindCss';
import ThreeJs from '@/app/components/techs/ThreeJs';
import TypeScript from '@/app/components/techs/TypeScript';
import Vercel from '@/app/components/techs/Vercel';
import { Project } from '@/app/types/project';
import JavaScript from '../components/techs/JavaScript';
import Html from '../components/techs/Html';
import CSS from '../components/techs/CSS';
import Electron from '../components/techs/Electron';

export const projects: Project[] = [
  {
    id: "1",
    title: 'Spott',
    description:
      'A modern, AI-powered Event Management Platform built with Next.js, Clerk... ',
    image: '/project/spott.png',

    link: 'https://event-7rvx.vercel.app',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      // { name: 'React', icon: <ReactIcon key="react" /> },
      // { name: 'Vercel', icon: <Vercel key="vercel" /> },
   { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
     
    ],
    github: 'https://github.com/Soumyaranjan-p/Event',
    live: 'https://event-7rvx.vercel.app',
    details: true,
    projectDetailsPageSlug: '/projects/spott',
    isWorking: true,
  },

 {
  id: '2',

  title: 'Pizza Hut Website',
  description:
    'Indulge in a slice of heaven with our delightful pizza offerings! Our website is designed to bring the joy of pizza right to your fingertips.',

  image: '/project/pizza.png',
  link: 'https://soumya-pizzahut.netlify.app/',
  technologies: [
    { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
    { name: 'HTML', icon: <Html key="html" /> },
    { name: 'CSS', icon: <CSS key="css" /> },
    { name: 'Netlify', icon: <Netlify key="netlify" /> },
  ],

  github: 'https://github.com/Soumyaranjan-p/pizza-website',
  live: 'https://soumya-pizzahut.netlify.app/',
  details: true,
  projectDetailsPageSlug: '/projects/pizza-websit',
  isWorking: true,
},
{
  id: '3',

  title: 'Webbit',
  description:
    'Webbit is a sleek reminder app built with TypeScript, Tailwind CSS, and smooth Motion animations — also available as a desktop app powered by Electron.',

  image: '/project/spiderman.png',
  link: 'https://spiderman-website-q1m7.vercel.app/',
  technologies: [
    { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
    { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
    { name: 'Motion', icon: <Motion key="motion" /> },
    { name: 'Electron', icon: <Electron key="electron" /> },
  ],

  github: 'https://github.com/Soumyaranjan-p/spiderman-website',
  live: 'https://spiderman-website-q1m7.vercel.app/',
  details: true,
  projectDetailsPageSlug: '/projects/webbit',
  isWorking: true,
}
];
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

export const projects: Project[] = [
  {
    title: 'Spott',
    description:
      'A comprehensive study platform with notes, flashcards, quizzes, AI chatbot, and interactive learning tools',
    image: '/project/spott.png',

    link: 'https://event-7rvx.vercel.app',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
  
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
     
    ],
    github: 'https://github.com/Soumyaranjan-p/Event',
    live: 'https://event-7rvx.vercel.app',
    details: true,
    projectDetailsPageSlug: '/projects/notesbuddy',
    isWorking: true,
  },
  {
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
  // {
  //   title: 'Syncify',
  //   description:
  //     'Real-time music streaming platform with synchronized playback, live chat, and social listening features',
  //   image: '/project/syncify.png',
  //   video: 'https://ik.imagekit.io/hokb3mrdr/syncify.mp4',
  //   link: 'https://syncify.rocks',
  //   technologies: [
  //     { name: 'React', icon: <ReactIcon key="react" /> },
  //     { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
  //     { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
  //     { name: 'Vercel', icon: <Vercel key="vercel" /> },
  //     { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
  //     { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
  //     { name: 'Socket.io', icon: <SocketIo key="socketio" /> },
  //   ],
  //   github: 'https://github.com/ramxcodes/syncify',
  //   live: 'https://syncify.rocks',
  //   details: true,
  //   projectDetailsPageSlug: '/projects/syncify',
  //   isWorking: true,
  // },
  // {
  //   title: 'Pasandida Aurat',
  //   description:
  //     'Innovative dating platform featuring anonymous questions and authentic connections - currently in development',
  //   image: '/project/pasandida.png',
  //   video: 'https://ik.imagekit.io/hokb3mrdr/pasandida.mp4',
  //   link: 'https://www.pasandidaurat.com/',
  //   technologies: [
  //     { name: 'Next.js', icon: <NextJs key="nextjs" /> },
  //     { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
  //     { name: 'Prisma', icon: <Prisma key="prisma" /> },
  //     { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
  //     { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
  //     { name: 'Socket.io', icon: <SocketIo key="socketio" /> },
  //   ],
  //   live: 'https://www.pasandidaurat.com/',
  //   details: true,
  //   projectDetailsPageSlug: '/projects/pasandida-aurat',
  //   isWorking: false, // Currently in development
  // },
  // {
  //   title: 'The Quest',
  //   description:
  //     'Personal challenge tracker for completing 500 DSA problems, earning ₹300,000, and improving fitness within 6 months',
  //   image: '/project/quest.png',
  //   video: 'https://ik.imagekit.io/hokb3mrdr/quest.mp4',
  //   link: 'https://quest.ramx.in/',
  //   technologies: [
  //     { name: 'Next.js', icon: <NextJs key="nextjs" /> },
  //     { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
  //     { name: 'Vercel', icon: <Vercel key="vercel" /> },
  //     { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
  //     { name: 'MDX', icon: <MDXIcon key="mdx" /> },
  //     { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
  //   ],
  //   github: 'https://github.com/ramxcodes/the-quest',
  //   live: 'https://quest.ramx.in/',
  //   details: true,
  //   projectDetailsPageSlug: '/projects/the-quest',
  //   isWorking: true,
  // },
  // {
  //   title: 'FestX',
  //   description:
  //     "Comprehensive event management platform for college festivals and hackathons built for NMIMS'24 Hackathon",
  //   image: '/project/festx.png',
  //   video: 'https://ik.imagekit.io/hokb3mrdr/fest-x.mp4',
  //   link: 'https://fest-x.ramx.in/',
  //   technologies: [
  //     { name: 'Next.js', icon: <NextJs key="nextjs" /> },
  //     { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
  //     { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
  //     { name: 'Vercel', icon: <Vercel key="vercel" /> },
  //     { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
  //     { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
  //   ],
  //   github: 'https://github.com/ramxcodes/fest-x',
  //   live: 'https://fest-x.ramx.in/',
  //   details: true,
  //   projectDetailsPageSlug: '/projects/fest-x',
  //   isWorking: true,
  // },
  // {
  //   title: "I'm a chill guy",
  //   description:
  //     'AI-powered GitHub profile roaster with intelligent analysis, witty commentary, and social sharing features',
  //   image: '/project/chillguy.png',
  //   link: 'https://chillguy.ramx.in',
  //   technologies: [
  //     { name: 'React', icon: <ReactIcon key="react" /> },
  //     { name: 'Express.js', icon: <ExpressJs key="expressjs" /> },
  //     { name: 'Vercel', icon: <Vercel key="vercel" /> },
  //     { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
  //     { name: 'Netlify', icon: <Netlify key="netlify" /> },
  //     { name: 'GitHub', icon: <Github key="github" /> },
  //   ],
  //   github: 'https://github.com/ramxcodes/chill-guy',
  //   live: 'https://chillguy.ramx.in',
  //   details: true,
  //   projectDetailsPageSlug: '/projects/chill-guy',
  //   isWorking: true,
  // },
  // {
  //   title: "Ram's Space",
  //   description:
  //     'Personal poetry and blog platform featuring emotional stories, poems, and creative writing with dark/light theme support',
  //   image: '/project/ramspace.png',
  //   video: 'https://ik.imagekit.io/hokb3mrdr/ramspace.mp4',
  //   link: 'https://blog.ramx.in/',
  //   technologies: [
  //     { name: 'Next.js', icon: <NextJs key="nextjs" /> },
  //     { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
  //     { name: 'React', icon: <ReactIcon key="react" /> },
  //     { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
  //     { name: 'MDX', icon: <MDXIcon key="mdx" /> },
  //   ],
  //   live: 'https://blog.ramx.in/',
  //   details: true,
  //   projectDetailsPageSlug: '/projects/poems-blog',
  //   isWorking: true,
  // },
  // {
  //   title: 'Intent JS',
  //   description:
  //     'Modern JavaScript library website with advanced animations, interactive playground, and comprehensive documentation',
  //   image: '/project/intent.png',
  //   video: 'https://ik.imagekit.io/hokb3mrdr/intent.mp4',
  //   link: 'https://intent-js.ramx.in',
  //   technologies: [
  //     { name: 'Next.js', icon: <NextJs key="nextjs" /> },
  //     { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
  //     { name: 'React', icon: <ReactIcon key="react" /> },
  //     { name: 'Motion', icon: <Motion key="motion" /> },
  //     { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
  //     { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
  //   ],
  //   github: 'https://github.com/ramxcodes/intent-js',
  //   live: 'https://intent-js.ramx.in',
  //   details: true,
  //   projectDetailsPageSlug: '/projects/intent-js',
  //   isWorking: true,
  // },
  // {
  //   title: 'Moonstone 2K25',
  //   description:
  //     "Official website for Medicaps University's premier annual college festival with event management and registration",
  //   image: '/project/moonstone.png',
  //   video: 'https://ik.imagekit.io/hokb3mrdr/moonstone.mp4',
  //   link: 'https://moonstone.ramx.in/',
  //   technologies: [
  //     { name: 'Next.js', icon: <NextJs key="nextjs" /> },
  //     { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
  //     { name: 'React', icon: <ReactIcon key="react" /> },
  //     { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
  //     { name: 'Motion', icon: <Motion key="motion" /> },
  //     { name: 'Three.js', icon: <ThreeJs key="threejs" /> },
  //     { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
  //   ],
  //   github: 'https://github.com/ramxcodes/moonstone-fest',
  //   live: 'https://moonstone.ramx.in/',
  //   details: true,
  //   projectDetailsPageSlug: '/projects/moonstone-fest',
  //   isWorking: true,
  // },
  // {
  //   title: 'Valorant Remastered',
  //   description:
  //     'Gaming website with immersive 3D animations, agent showcases, and performance-optimized Valorant experience',
  //   image: '/project/valorant.png',
  //   video: 'https://ik.imagekit.io/hokb3mrdr/valorant.mp4',
  //   link: 'https://valorant.ramx.in',
  //   technologies: [
  //     { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
  //     { name: 'React', icon: <ReactIcon key="react" /> },
  //   ],
  //   github: 'https://github.com/ramxcodes/valorant-remastered',
  //   live: 'https://valorant.ramx.in',
  //   details: true,
  //   projectDetailsPageSlug: '/projects/valorant-remastered',
  //   isWorking: true,
  // },
  // {
  //   title: 'That Startup',
  //   description:
  //     'Startup listing and pitching platform where entrepreneurs can submit ideas, vote on concepts, and connect with founders',
  //   image: '/project/that-startup.png',
  //   video: 'https://ik.imagekit.io/hokb3mrdr/that-startup.mp4',
  //   link: 'https://that-startup.ramx.in/',
  //   technologies: [
  //     { name: 'Next.js', icon: <NextJs key="nextjs" /> },
  //     { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
  //     { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
  //     { name: 'Sanity', icon: <Sanity key="sanity" /> },
  //     { name: 'Vercel', icon: <Vercel key="vercel" /> },
  //   ],
  //   github: 'https://github.com/ramxcodes/that-startup',
  //   live: 'https://that-startup.ramx.in/',
  //   details: true,
  //   projectDetailsPageSlug: '/projects/that-startup',
  //   isWorking: true,
  // },
];

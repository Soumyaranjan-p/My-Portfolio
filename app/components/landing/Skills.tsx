// "use client"
// import { about, mySkills } from '@/app/config/About';
// import Image from 'next/image';

// import { motion } from "framer-motion";
// import Container from '../common/Container';
// import SectionHeading from '../common/SectionHeading';
// import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// export default function About() {
//   return (
//     <Container className="mt-20">
//       {/* <SectionHeading subHeading="About" heading="Me" /> */}
//       <SectionHeading subHeading="Skills" heading="Tools & Technologies" />

//       {/* About me */}
//       <motion.div
//       initial={{ opacity: 0, y: 20 }}
// animate={{
//   opacity: 1,
//   y: 0,
//   transition: {
//     duration: 0.6,
//     ease: "easeOut"
//   }
// }}
// whileHover={{
//   scale: 1.05,
//   y: -4,
//   boxShadow: "0px 12px 32px rgba(0,0,0,0.12)",
//   transition: { duration: 0.25 }
// }}
// whileTap={{
//   scale: 0.97
// }}


//        className="mt-8 flex flex-col gap-4 md:flex-row">
//         <Image
//           src="/assets/logo-t.png"
//           alt="About"
//           width={100}
//           height={100}
//           className="border-secondary size-60 rounded-md border-2 bg-blue-300 dark:bg-red-600"
//         />
//         <div className="mt-4">
          
          
//         </div>
//       </motion.div>
//     </Container>
//   );
// }


import Nextjs from "@/app/icons/Nextjs";

import NodeJs from "@/app/icons/NodeIcon";
import TS from "@/app/icons/TS"
import ReactIcon from "@/app/icons/ReactIcon";
import DockerIcon from "../techs/Docker";
import RedisIcon from "../techs/RedisIcon";
import TailwindIcon from "@/app/icons/TailwindIcon";
import Mongo from "@/app/icons/Mongo";
import VS from "../techs/VS";
import Container from "../common/Container";


const skills = [
  {
    name: "Typescript",
    icon: <TS />,
    link: "https://www.typescriptlang.org/",
  },
  {
    name: "Node.js",
    icon: <NodeJs />,
    link: "https://nodejs.org/",
  },
  {
    name: "Next.js",
    icon: <Nextjs />,
    link: "https://nextjs.org/",
  },
  {
    name: "React",
    icon: <ReactIcon />,
    link: "https://react.dev/",
  },
  {
    name: "Docker",
    icon: <DockerIcon />,
    link: "https://www.docker.com/",
  },
  {
    name: "Redis",
    icon: <RedisIcon />,
    link: "https://redis.io/",
  },
  {
    name: "Tailwind css",
    icon: <TailwindIcon />,
    link: "https://tailwindcss.com/",
  },
  {
    name: "MongoDB",
    icon: <Mongo />,
    link: "https://www.mongodb.com/",
  },
  {
    name: "Visual Studio Code",
    icon: <VS />,
    link: "https://code.visualstudio.com/",
  },
];

const Skills = () => {
  return (
     <Container className="mb-10" >
      <div >
        <p className=" text-sm">Skills</p>
        <h1 className="  text-xl tracking-tight font-black  w-fit">
          Tools <span className="px-2">&</span> Technologies
        </h1>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 max-w-4xl mx-auto py-8">
        {skills.map((skill) => (
          <a
            key={skill.name}
            href={skill.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center justify-center gap-2 p-4 transition-all duration-300 hover:scale-110"
          >
            <div className="text-4xl grayscale transition-all duration-300 group-hover:grayscale-0 opacity-80 group-hover:opacity-100">
              {skill.icon}
            </div>
            <span className="text-sm font-medium text-neutral-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 absolute -bottom-2 whitespace-nowrap dark:text-neutral-400">
              {skill.name}
            </span>
          </a>
        ))}
      </div>
    </Container>
  );
};

export default Skills;

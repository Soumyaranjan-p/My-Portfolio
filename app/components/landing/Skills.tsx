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
import Marquee from "react-fast-marquee";
// import Skill from "../common/Skill";
// import NodeJs from "@/app/icons/NodeIcon";
// import TS from "@/app/icons/TS"
// import ReactIcon from "@/app/icons/ReactIcon";
// import DockerIcon from "../techs/Docker";
// import RedisIcon from "../techs/RedisIcon";
// import TailwindIcon from "@/app/icons/TailwindIcon";
// import Mongo from "@/app/icons/Mongo";
// import VS from "../techs/VS";
import Container from "../common/Container";


const skills = [
  {
    name: "Typescript",
    icon: "/tech-icons/typescript.svg",
    link: "https://www.typescriptlang.org/",
  },
  {
    name: "Node.js",
    icon: "/tech-icons/nodejs.svg",
    link: "https://nodejs.org/",
  },
  {
    name: "Next.js",
    icon: "/tech-icons/nextjs.svg",
    link: "https://nextjs.org/",
  },
  {
    name: "React",
    icon: "/tech-icons/react.svg",
    link: "https://react.dev/",
  },
  {
    name: "Docker",
    icon: "/tech-icons/docker.svg",
    link: "https://www.docker.com/",
  },
  {
    name: "Redis",
    icon: "/tech-icons/redis.svg",
    link: "https://redis.io/",
  },
  {
    name: "Tailwind css",
    icon: "/tech-icons/tailwind.svg",
    link: "https://tailwindcss.com/",
  },
  {
    name: "MongoDB",
    icon: "/tech-icons/mongodb.svg",
    link: "https://www.mongodb.com/",
  },
  {
    name: "Visual Studio Code",
    icon: "/tech-icons/vscode.svg",
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

           <div className="relative overflow-hidden">
  <Marquee
    pauseOnHover
    gradient={false}
    speed={40}
    className="py-2"
  >
    {skills.map((skill, index) => (
      <div key={index} className="mx-2">
        <Skill name={skill.name} href={skill.link}>
        
        </Skill>
      </div>
    ))}
  </Marquee>
</div>
    </Container>
  );
};

export default Skills;

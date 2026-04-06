
import JavaScript from '@/app/components/techs/JavaScript';
import MongoDB from '@/app/components/techs/MongoDB';
import NextJs from '@/app/components/techs/NextJs';
import NodeJs from '@/app/components/techs/NodeJs';
import ExpressJs from '../components/techs/ExpressJs';
import ReactIcon from '@/app/components/techs/ReactIcon';
import TypeScript from '@/app/components/techs/TypeScript';
import Highlight from './Highlight';
export const mySkills = [
  <ReactIcon key="react" />,

  <JavaScript key="javascript" />,
  <TypeScript key="typescript" />,
  <MongoDB key="mongodb" />,
  <NextJs key="nextjs" />,
  <NodeJs key="nodejs" />,
  <ExpressJs key="expressjs" />,
 
];

// export const about = {
//   name: 'Soumya Ranjan',
//   description: `I like taking ideas from zero to launch. Whether it’s frontend, backend, or deployment, I enjoy building end-to-end solutions that are clean, usable, and built to last.`,
//   // description: `I'm a Full Stack web developer and Open Source Contributor, I love building products to solve real-world problems. I'm specialized in building MVP's.`,
// };

export const about = {
  name: 'Soumya Ranjan',
  description: (
    <>
      I like taking ideas from <Highlight>zero to launch</Highlight>. Whether
      it’s <Highlight>frontend</Highlight>, backend, or <Highlight>deployment</Highlight>, I enjoy building{" "}
      <Highlight>end-to-end</Highlight> solutions that are{" "}
      <Highlight>clean</Highlight>, usable, and{" "}
      <Highlight>built to last</Highlight>.
    </>
  ),
};

'use client';

import { projects } from '@/app/config/Projects';
import { Link } from 'next-view-transitions';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { ProjectList } from '../projects/ProjectList';
// import { Button } from '@/components/ui/button';
import AnimatedButton from '@/components/ui/animated-button';

export default function Projects() {
  return (
    <Container className="mt-20">
      <SectionHeading subHeading="Featured" heading="Projects" />

      <ProjectList className="mt-8" projects={projects.slice(0, 4)} />
      <div className="mt-8 flex justify-center">
        <AnimatedButton className='' variant="outline">
          <Link href="/projects">    
            
   Show all projects  
          
          </Link>
      </AnimatedButton>
      </div>
    </Container>
  );
}

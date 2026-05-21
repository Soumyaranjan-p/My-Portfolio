import { type Project } from '@/app/types/project';

import { ProjectCard } from './ProjectCard';
import { CrosshairBox } from '../common/Crosshair';
interface ProjectListProps {
  projects: Project[];
  className?: string;
}

export function ProjectList({ projects, className }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No projects found.</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
  {projects.map((project: Project) => (
    <CrosshairBox key={project.id} className="px-6 py-6">
    <ProjectCard key={project.title} project={project} />
    </CrosshairBox>
  ))}
</div>
  );
}

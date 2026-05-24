import { type Project } from '@/app/types/project';
import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  className?: string;
}

export function ProjectList({ projects, className = '' }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground text-sm">No projects found.</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {projects.map((project: Project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

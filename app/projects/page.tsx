import Container from '@/app/components/common/Container';
import { ProjectList } from '@/app/components/projects/ProjectList';
import { Separator } from '@/components/ui/separator';
import { projects } from '@/app/config/Projects';
import { generateMetadata as getMetadata } from '@/app/config/Meta';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import ArrowLeft from '@/app/components/svgs/ArrowLeft';

export const metadata: Metadata = {
  ...getMetadata('/projects'),
};

export default function ProjectsPage() {
  return (
    <Container className="py-16">
      <div className="space-y-10">
        {/* Back Link */}
        <div>
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold tracking-tight">
            Projects
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            A showcase of application development, libraries, open-source work, and technical tools.
          </p>
        </div>

        <Separator className="bg-muted/40" />

        {/* Projects */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">
              All Projects
              {projects.length > 0 && (
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  ({projects.length}{' '}
                  {projects.length === 1 ? 'project' : 'projects'})
                </span>
              )}
            </h2>
          </div>

          <ProjectList projects={projects} />
        </div>
      </div>
    </Container>
  );
}

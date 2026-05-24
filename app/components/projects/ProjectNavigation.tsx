import { Separator } from '@/components/ui/separator';
import { Link } from 'next-view-transitions';
import ArrowLeft from '../svgs/ArrowLeft';
import ArrowRight from '../svgs/ArrowRight';

interface ProjectNavigationProps {
  previous: { title: string; slug: string } | null;
  next: { title: string; slug: string } | null;
}

export function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Separator className="bg-muted/40" />

      <div className="flex flex-col sm:flex-row justify-between gap-6 text-sm">
        {/* Previous Project */}
        <div>
          {previous ? (
            <Link 
              href={`/projects/${previous.slug}`}
              className="group flex flex-col items-start gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-xs text-muted-foreground/60 flex items-center gap-1">
                <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
                Previous Project
              </span>
              <span className="font-medium text-foreground text-left">{previous.title}</span>
            </Link>
          ) : (
            <div className="h-10" />
          )}
        </div>

        {/* Next Project */}
        <div className="sm:text-right">
          {next ? (
            <Link 
              href={`/projects/${next.slug}`}
              className="group flex flex-col sm:items-end items-start gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-xs text-muted-foreground/60 flex items-center gap-1">
                Next Project
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="font-medium text-foreground text-right">{next.title}</span>
            </Link>
          ) : (
            <div className="h-10" />
          )}
        </div>
      </div>
    </div>
  );
}

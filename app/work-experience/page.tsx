import Container from '@/app/components/common/Container';
import { experiences } from '@/app/config/Experience';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { generateMetadata as getMetadata } from '@/app/config/Meta';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import ArrowLeft from '@/app/components/svgs/ArrowLeft';

export const metadata: Metadata = {
  ...getMetadata('/work-experience'),
};

const parseDescription = (text: string): string => {
  return text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
};

export default function WorkExperiencePage() {
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
            Work Experience
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            A comprehensive history of my professional roles, key contributions, and engineering expertise.
          </p>
        </div>

        <Separator className="bg-muted/40" />

        {/* Experience List */}
        <div className="flex flex-col gap-10">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="group space-y-3 "
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base  blur-sm font-semibold">{exp.company}</h3>
                    {exp.isCurrent && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-medium">
                        Working
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mt-0.5">{exp.position}</p>
                </div>

                <div className="sm:text-right shrink-0">
                  <p className="text-sm text-muted-foreground font-medium">
                    {exp.startDate} – {exp.endDate}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{exp.location}</p>
                </div>
              </div>

              {/* Description bullets */}
              <ul className="list-none space-y-1.5 pl-0">
                {exp.description.map((bullet, idx) => (
                  <li 
                    key={idx}
                    className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-muted-foreground/50 select-none pt-0.5">•</span>
                    <span 
                      dangerouslySetInnerHTML={{ __html: parseDescription(bullet) }}
                    />
                  </li>
                ))}
              </ul>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.techs.map((tech) => (
                  <Badge
                    key={tech.name}
                    variant="outline"
                    className="text-xs font-normal px-2 py-0.5 border-border/80 text-muted-foreground bg-transparent shadow-none"
                  >
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProjectCaseStudyFrontmatter } from '@/app/types/project';
import rehypeHighlight from '@shikijs/rehype';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Github from '../svgs/Github';
import Website from '../svgs/Website';
import { ProjectComponents } from './ProjectComponents';

interface ProjectContentProps {
  frontmatter: ProjectCaseStudyFrontmatter;
  content: string;
}

export function ProjectContent({ frontmatter, content }: ProjectContentProps) {
  const {
    title,
    description,
    image,
    technologies,
    github,
    live,
    timeline,
    role,
    team,
    status,
    challenges,
    learnings,
  } = frontmatter;

  return (
    <article className="mx-auto max-w-2xl space-y-8">
      {/* Hero Section */}
      <header className="space-y-5">
        {image && (
          <div className="relative aspect-video overflow-hidden rounded-lg border border-border/40">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge 
              variant="outline" 
              className="capitalize text-xs font-normal px-2 py-0.5 border-border/80 text-muted-foreground bg-transparent shadow-none"
            >
              {status}
            </Badge>
          </div>

          <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            {title}
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed">{description}</p>

          {/* Project Meta Information */}
          <div className="grid grid-cols-2 gap-4 pt-2 text-sm sm:grid-cols-4">
            <div>
              <span className="block text-xs text-muted-foreground">Timeline</span>
              <span className="font-medium text-foreground">{timeline}</span>
            </div>
            <div>
              <span className="block text-xs text-muted-foreground">Role</span>
              <span className="font-medium text-foreground">{role}</span>
            </div>
            {team && (
              <div>
                <span className="block text-xs text-muted-foreground">Team</span>
                <span className="font-medium text-foreground">{team}</span>
              </div>
            )}
            <div>
              <span className="block text-xs text-muted-foreground">Status</span>
              <span className="font-medium text-foreground capitalize">{status}</span>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-4 pt-2">
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Website className="size-3.5" />
                <span>Live Demo</span>
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="size-3.5" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        <Separator className="bg-muted/40" />
      </header>

      {/* Technology Stack */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold">Technology Stack</h3>
        <div className="flex flex-wrap gap-1.5">
          {technologies.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs font-normal px-2 py-0.5 border-border/80 text-muted-foreground bg-transparent shadow-none"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Challenges and Learnings */}
      {(challenges?.length || learnings?.length) && (
        <div className="grid gap-6 sm:grid-cols-2 pt-2">
          {challenges && challenges.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-semibold">
                Key Challenges
              </h3>
              <ul className="space-y-1.5">
                {challenges.map((challenge, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-muted-foreground/50 select-none pt-0.5">•</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {learnings && learnings.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-semibold">
                Key Learnings
              </h3>
              <ul className="space-y-1.5">
                {learnings.map((learning, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-muted-foreground/50 select-none pt-0.5">•</span>
                    <span>{learning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <Separator className="bg-muted/40" />

      {/* Content */}
      <div className="prose prose-neutral max-w-none dark:prose-invert leading-relaxed text-sm sm:text-base">
        <MDXRemote
          source={content}
          components={ProjectComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [
                  rehypeHighlight,
                  {
                    theme: 'github-dark',
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}

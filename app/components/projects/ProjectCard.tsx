'use client';

import { type Project } from '@/app/types/project';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';
import Github from '../svgs/Github';
import Website from '../svgs/Website';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({
  project,
}: ProjectCardProps): React.ReactElement {
  return (
    <div className="flex flex-col sm:flex-row gap-5 py-6 border-b border-muted/50 last:border-0 items-start">
      {/* Left side: Project thumbnail */}
      {project.image && (
        <div className="relative aspect-video w-full sm:w-44 shrink-0 overflow-hidden rounded-md border border-border/40">
          <Image
            className="object-cover"
            src={project.image}
            alt={project.title}
            fill
          />
        </div>
      )}

      {/* Right side: Project details */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          {/* Title */}
          <Link href={project.projectDetailsPageSlug || '#'}>
            <h3 className="text-base font-semibold hover:underline">
              {project.title}
            </h3>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-3 shrink-0">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Website className="size-3.5" />
                <span>Live</span>
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="size-3.5" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.map((tech) => (
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
    </div>
  );
}
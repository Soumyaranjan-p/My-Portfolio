'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card } from '@/components/ui/card';
import { type Project } from '@/app/types/project';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React, { useState } from 'react';

import Github from '../svgs/Github';
import PlayCircle from '../svgs/PlayCircle';
import Website from '../svgs/Website';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({
  project,
}: ProjectCardProps): React.ReactElement {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
   <Card className="group w-full overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 p-0 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-gray-300/80 hover:bg-white/90 hover:shadow-md dark:border-white/10 dark:bg-black/40 dark:shadow-none dark:hover:border-white/15 dark:hover:bg-black/50">
    <div className="flex h-[200px] flex-row">

        {/* LEFT: fixed-width thumbnail */}
      <div className="relative h-full w-[250px] shrink-0 overflow-hidden">
          <Image
            className="h-full w-full object-cover rounded-l-xl"
            src={project.image}
            alt={project.title}
            width={1800}
            height={900}
          />
        </div>

        {/* RIGHT: content */}
       <div className="flex h-full flex-1 flex-col justify-between px-8 py-7">
          <div className="space-y-3">

            {/* Title + links row */}
            <div className="flex items-center justify-between gap-4">
              <Link href={project.projectDetailsPageSlug}>
                <h3 className="text-xl font-semibold leading-tight text-gray-900 transition-colors group-hover:text-primary hover:cursor-pointer dark:text-gray-100">
                  {project.title}
                </h3>
              </Link>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={project.link}
                  target="_blank"
                  className="flex items-center gap-1.5 rounded-md border border-gray-300/80 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white"
                >
                  <Website className="size-4" />
                  Live
                </Link>

                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    className="flex items-center gap-1.5 rounded-md border border-gray-300/80 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white"
                  >
                    <Github className="size-4" />
                    GitHub
                  </Link>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="line-clamp-1 text-sm text-gray-600 dark:text-gray-400">
              {project.description}
            </p>

            {/* Technologies */}
           <div className="flex flex-wrap gap-3">
  {project.technologies.map((technology, index) => (
    <Tooltip key={index}>
      <TooltipTrigger asChild>
        <div className="flex size-9 items-center justify-center rounded-lg border border-gray-200/60 bg-gray-100/50 transition-all duration-300 hover:scale-110 hover:border-gray-300 hover:bg-gray-200/50 hover:cursor-pointer dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20 dark:hover:bg-white/[0.06]">
          <div className="size-5 text-gray-700 dark:text-gray-300">
            {technology.icon}
          </div>
        </div>
      </TooltipTrigger>

      <TooltipContent>
        <p>{technology.name}</p>
      </TooltipContent>
    </Tooltip>
  ))}
</div>
</div>
          {/* Footer: status badge */}
          {project.details && (
            <div className="mt-4">
              <div
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium border ${
                  project.isWorking
                    ? 'border-green-300/50 bg-green-500/10 text-green-700 dark:border-green-500/30 dark:text-green-400'
                    : 'border-red-300/50 bg-red-500/10 text-red-700 dark:border-red-500/30 dark:text-red-400'
                }`}
              >
                {project.isWorking ? (
                  <>
                    <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                    All Systems Operational
                  </>
                ) : (
                  <>
                    <div className="size-2 rounded-full bg-red-500 animate-pulse" />
                    Building
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
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
   <Card className="group w-full overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm transition-all p-0 shadow-none rounded-2xl">
    <div className="flex h-[200px] flex-row">

        {/* LEFT: fixed-width thumbnail */}
      <div className="relative w-[250px] shrink-0 overflow-hidden">
          <Image
            className="h-full w-full object-cover rounded-l-xl"
            src={project.image}
            alt={project.title}
            width={1800}
            height={900}
          />

          {project.video && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:backdrop-blur-xs">
                  <button className="flex size-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors duration-200 group-hover:cursor-pointer hover:bg-white/30">
                    <PlayCircle />
                  </button>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-4xl w-full p-0 border-0">
                <div className="aspect-video w-full">
                  <video
                    className="h-full w-full object-cover rounded-lg"
                    src={project.video}
                    autoPlay
                    loop
                    controls
                  />
                </div>

                <DialogTitle className="sr-only">
                  {project.title}
                </DialogTitle>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* RIGHT: content */}
       <div className="flex flex-col justify-between flex-1 px-8 py-7">
          <div className="space-y-3">

            {/* Title + links row */}
            <div className="flex items-center justify-between gap-4">
              <Link href={project.projectDetailsPageSlug}>
                <h3 className="text-xl font-semibold leading-tight group-hover:text-primary hover:cursor-pointer">
                  {project.title}
                </h3>
              </Link>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={project.link}
                  target="_blank"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
                >
                  <Website className="size-4" />
                  Live
                </Link>

                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
                  >
                    <Github className="size-4" />
                    GitHub
                  </Link>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-secondary line-clamp-1 text-sm">
              {project.description}
            </p>

            {/* Technologies */}
           <div className="flex flex-wrap gap-3">
  {project.technologies.map((technology, index) => (
    <Tooltip key={index}>
      <TooltipTrigger asChild>
        <div className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-all duration-300 hover:scale-110 hover:border-white/20 hover:bg-white/[0.06] hover:cursor-pointer">
          <div className="size-5">
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
                className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs ${
                  project.isWorking
                    ? 'border-green-300 bg-green-500/10'
                    : 'border-red-300 bg-red-500/10'
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
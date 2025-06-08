import { Project } from '@/types';
import { Tags } from 'lucide-react';
import { useState } from 'react';
import { ProjectCard } from './project-card';

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Blogger template maya walkins',
      description: 'An HTML template for blogger ,designed by Hicham',
      tags: ['React', 'Electronjs'],
      icon: undefined,
      thumbnail: undefined,
      folders: [],
      tasks: [],
      note: '',
      isFavorite: false,
      commands: [
        {
          title: 'Run',
          command: 'npm run dev',
        },
        {
          title: 'Build',
          command: 'npm run build',
        },
      ],
    },
    {
      id: '2',
      title: 'Project 2',
      description: 'Project 2 description',
      icon: undefined,
      thumbnail: undefined,
      tags: ['React', 'Electronjs'],
      folders: [],
      tasks: [],
      note: '',
      isFavorite: false,
      commands: [
        {
          title: 'Run',
          command: 'npm run dev',
        },
        {
          title: 'Build',
          command: 'npm run build',
        },
      ],
    },
  ]);

  return (
    <div className="flex flex-col gap-4 scroll-auto">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

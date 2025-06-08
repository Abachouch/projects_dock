import { StarIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Project } from '@/types';

export function ProjectCard({
  project: { title, description, tags, commands, icon },
}: {
  project: Project;
}) {
  console.log(title);
  return (
    <div className="bg-card rounded-sm p-4 w-full flex flex-col gap-4">
      <div className="flex content-center gap-3">
        {/* icon */}
        {icon && <div>Icon</div>}

        <div className="w-full leading-6 text-[17px] font-bold">{title}</div>
        {/* favourite */}
        <StarIcon />
      </div>
      {/* description */}
      <div className="text-sm leading-4"> {description} </div>
    </div>
  );
}

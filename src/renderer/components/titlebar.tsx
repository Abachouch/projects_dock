import { Icon, MoreVerticalIcon, PlusIcon, XIcon } from 'lucide-react';
import { Button } from './ui/button';
import { TitleBarMenu } from './titlebar-menu';
import { ModeToggle } from './mode-toggle';

export function TitleBar() {
  return (
    <div className="py-4 px-5 flex items-center gap-2">
      <Button size="sm" variant="secondary" className="text-xs cursor-pointer">
        <PlusIcon size={16} /> Add Project
      </Button>
      <h1 className="text-sm font-bold px-4 w-full text-right">
        Projects Dock
      </h1>

      <TitleBarMenu></TitleBarMenu>
      <Button variant={'secondary'} size="sm">
        <XIcon size={16} />
      </Button>
      <ModeToggle />
    </div>
  );
}

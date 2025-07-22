import { PlusIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { ModeToggle } from './mode-toggle'
import { useProjects } from '../context/project-provide'

export const TitleBar = (): React.JSX.Element => {
  const { addProject } = useProjects()
  const handleAddProject = (): void => {
    addProject()
  }
  return (
    <div className="flex px-4 py-2 gap-4 items-center bg-blue-200 dark:bg-zinc-900 electron-draggable">
      <Button className="electron-clickable" variant={'outline'} size={'sm'}>
        <PlusIcon size={16}></PlusIcon>
        <span className="text-xs font-normale" onClick={handleAddProject}>
          Add Project
        </span>
      </Button>
      <span className="w-full text-sm text-right font-medium ">Project Dock</span>
      <ModeToggle></ModeToggle>

      <Button
        onClick={() => {
          window.electron.ipcRenderer.send('app:close')
        }}
        className="electron-clickable"
        variant={'outline'}
        size={'icon'}
      >
        <XIcon size={12}></XIcon>
      </Button>
    </div>
  )
}

import { AppMoreData, AppProject, AppProjectType } from '../../../../types/project'
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '../ui/sheet'
import { ScrollArea } from '../ui/scroll-area'
import { Button } from '../ui/button'
import {
  Code2Icon,
  FolderIcon,
  NotebookIcon,
  ScrollIcon,
  TerminalIcon,
  Trash2Icon
} from 'lucide-react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Progress } from '../ui/progress'
import { useEffect, useState } from 'react'
import { useProjects } from '../context/project-provide'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../ui/select'

export const ProjectCardSheetContent = ({
  project
}: {
  project: AppProject
}): React.JSX.Element => {
  const [moreData, setMoreData] = useState<AppMoreData>({ readme: undefined, tasks: undefined })
  const [progress, setProgress] = useState<number>(0)
  const [, setError] = useState<string | null>(null)
  const { runScript, openIn, deleteProject, getMoreData } = useProjects()

  const handleRunScript = async (link: string, script: string): Promise<void> => {
    await runScript(link, script)
  }
  const handleOpenIn = async (link: string, inApp: string): Promise<void> => {
    await openIn(link, inApp)
  }
  const handleDelete = async (link: string): Promise<void> => {
    await deleteProject(link)
  }

  useEffect(() => {
    getMoreData(project.link)
      .then((data) => {
        if (data) {
          setMoreData(data)
          setError(null)
          if (data?.tasks && data.tasks.length > 0) {
            const done = data.tasks.filter((task) => task.isDone).length
            const total = data.tasks.length
            setProgress(Math.round((done / total) * 100))
          }
        }
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      })
  }, [project.link, getMoreData])

  return (
    <SheetContent side="right" className="flex flex-col w-10/12 ">
      <SheetHeader>
        <SheetTitle>{project.name}</SheetTitle>
        {project.description && (
          <SheetDescription className="mb-2">{project.description}</SheetDescription>
        )}

        <Select
          // value={choosenType}
          // onValueChange={(s) => {
          //   setChoosenType(s as AppProjectType)
          // }}
          defaultValue={project.type}
        >
          <SelectTrigger size="sm" className="w-[180px]">
            <SelectValue placeholder="Select folder type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Types</SelectLabel>

              {Object.entries(AppProjectType)
                .filter(([, value]) => !['DELETED', 'UNKNOWN'].includes(value))
                .map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    {value}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </SheetHeader>

      <ScrollArea className="w-full overflow-hidden   ">
        <section className="flex w-full  flex-col gap-4  px-4 py-4 ">
          <p className="text-xs text-muted-foreground break-all">{project.link}</p>

          <div>
            <span className="text-xs text-muted-foreground">Open with</span>
            <div className="flex gap-2 flex-wrap mt-2">
              <Button
                onClick={() => handleOpenIn(project.link, 'explorer')}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <FolderIcon size={16} color="#FFCA28" fill="#FFCA28" />
                <span className="text-xs">File Explorer</span>
              </Button>
              <Button
                onClick={() => handleOpenIn(project.link, 'terminal')}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <TerminalIcon size={16} />
                <span className="text-xs">Terminal</span>
              </Button>
              <Button
                onClick={() => handleOpenIn(project.link, 'vscode')}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Code2Icon size={16} color="#007bff" />
                <span className="text-xs">Visual Code</span>
              </Button>
            </div>
          </div>

          {project.scripts && project.scripts.length > 0 && (
            <div>
              <span className="text-xs text-muted-foreground">Npm Scripts</span>
              <div className="flex gap-2 flex-wrap mt-2">
                {project.scripts.map((script, id) => (
                  <Button
                    onClick={() => {
                      handleRunScript(project.link, script.name)
                    }}
                    key={id}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <ScrollIcon size={16} />
                    <span className="text-xs">{script.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </section>
        <div className="">
          {moreData && moreData.readme && (
            <div className="p-2 w-full">
              <h1 className="pb-4 text-sm text-muted-foreground">Read me file</h1>

              <div className="w-96 overflow-y-auto border border-border p-4 prose prose-sm bg-gray-100 dark:bg-neutral-900  dark:prose-invert">
                <Markdown remarkPlugins={[remarkGfm]}>{moreData?.readme}</Markdown>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <SheetFooter className="border-t p-4">
        {moreData && moreData.tasks && moreData.tasks.length > 0 && (
          <div className="w-full pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Tasks</span>
              <Button variant="outline" size="sm" className="gap-2">
                <NotebookIcon size={16} />
                <span className="text-sm">Open</span>
              </Button>
            </div>

            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-4">
                  <Progress value={progress} className="flex-1" />
                  <span className="text-nowrap text-xs font-bold">
                    {moreData.tasks.filter((p) => p.isDone).length}/{moreData.tasks.length}
                  </span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="flex flex-col gap-4 w-80 overflow-auto ">
                <span className="text-sm text-muted-foreground">Tasks</span>
                <ScrollArea className="w-full h-80 overflow-auto">
                  <div className="flex flex-col gap-4 overflow-auto ">
                    {moreData.tasks.map((task, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-muted-foreground font-bold mr-4">{index + 1}</span>{' '}
                        <span className="text-xs wrap-break-word">{task.description}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </HoverCardContent>
            </HoverCard>
          </div>
        )}

        <div className="pt-2">
          <Button
            onClick={() => {
              handleDelete(project.link)
            }}
            className="w-full"
            variant={'destructive'}
            size={'sm'}
          >
            <Trash2Icon></Trash2Icon>
            Delete this Project
          </Button>
        </div>
      </SheetFooter>
    </SheetContent>
  )
}

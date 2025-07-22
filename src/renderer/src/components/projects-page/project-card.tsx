import React, { useEffect, useState } from 'react'
import { AppProject, AppProjectEntry, AppProjectType } from '../../../../types/project'
import { Sheet, SheetTrigger } from '../ui/sheet'
import { Badge } from '../ui/badge'
// import thumb from '../../assets/bg.webp'
import { Skeleton } from '../ui/skeleton'
import { ProjectCardSheetContent } from './project-card-sheet-content'
import { useProjects } from '../context/project-provide'
import { ProjectCardHeader } from './project-card-header'

const getFolderName = (link: string): string => {
  const trimmed = link.replace(/[\\/]+$/, '') // remove trailing slashes
  const parts = trimmed.split(/[\\/]/) // split by '/' or '\'
  return parts[parts.length - 1] || ''
}

export const ProjectCard = ({
  projectEntry
}: {
  projectEntry: AppProjectEntry
}): React.JSX.Element => {
  const [project, setProject] = useState<AppProject | null>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const { getProjectData } = useProjects()

  useEffect(() => {
    getProjectData(projectEntry.link)
      .then((data) => {
        if (data) {
          data.name = data.name || getFolderName(projectEntry.link)
          data.type =
            projectEntry.type === AppProjectType.UNKNOWN ? AppProjectType.FOLDER : projectEntry.type

          // testing
          // data.thumbnail = thumb
          // data.keywords = ['keyword1', 'keyword2', 'keyword3']
          // data.description =
          //   'Lorem ipsum dolor sit amet  ipsam ipsum harum alias deleniti ea laboriosam.'
        }

        setProject(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [projectEntry, getProjectData])

  if (loading) return <Skeleton className="h-32 rounded-lg" />
  if (!project) return <div>Failed to load project : {error}</div>

  return (
    <Sheet>
      <SheetTrigger asChild>
        <article className="shadow-2xl bg-card hover:bg-accent cursor-pointer w-full gap-0 p-2 rounded-md ">
          <ProjectCardHeader
            icon={project.icon}
            name={project.name}
            thumbnail={project.thumbnail}
            type={project.type}
          />
          {project.description && (
            <div className="px-2 py-2 ">
              <p className="text-xs leading-relaxed text-muted-foreground">{project.description}</p>
              {project.keywords && project.keywords.length > 0 && (
                <div className="py-2 flex flex-wrap gap-2">
                  {project.keywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-accent  text-accent-foreground text-xs font-light"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </article>
      </SheetTrigger>
      <ProjectCardSheetContent project={project} />
    </Sheet>
  )
}

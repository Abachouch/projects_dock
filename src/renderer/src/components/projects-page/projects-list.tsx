import { useMemo } from 'react'
import { useProjects } from '../context/project-provide'
import Fuse from 'fuse.js'
import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'
import Masonry from 'react-responsive-masonry'
import { ProjectCard } from './project-card'

const PROJECT_SEARCH_OPTIONS = {
  keys: ['link', 'name'],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2
}

export const ProjectsList = ({ query }: { query: string }): React.JSX.Element => {
  const { projects, addProject, loading, error } = useProjects()

  const fuse = useMemo(() => new Fuse(projects, PROJECT_SEARCH_OPTIONS), [projects])

  const filteredProjects = useMemo(() => {
    if (!query.trim()) return projects
    return fuse.search(query).map((result) => result.item)
  }, [query, projects, fuse])

  const handleAddProject = async (): Promise<void> => {
    await addProject()
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 p-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-32 rounded-lg" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <p className="text-muted-foreground">
          {projects.length === 0
            ? 'No projects available. Add your first project!'
            : 'No projects match your search'}
        </p>
        {projects.length === 0 && (
          <Button
            onClick={() => {
              handleAddProject()
            }}
            variant="default"
          >
            Add Project
          </Button>
        )}
      </div>
    )
  }

  return (
    <Masonry columnsCount={2} gutter="16px">
      {filteredProjects.map((project) => (
        <ProjectCard
          projectEntry={project}
          key={project.link}
          //  onRefresh={handleRefresh}
        />
      ))}
    </Masonry>
  )
}

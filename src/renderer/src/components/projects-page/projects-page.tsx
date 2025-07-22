// import React, { useEffect, useState } from 'react'
// import { AppProjectEntry } from '../../../../types/project'
// import { ProjectCard } from './project-card'
// import Fuse from 'fuse.js'
// import { Input } from '../ui/input'
// import { ScrollArea } from '../ui/scroll-area'
// import Masonry from 'react-responsive-masonry'

// export const ProjectsPage = (): React.ReactElement => {
//   const [query, setQuery] = useState('')
//   const [projects, setProjects] = useState<AppProjectEntry[]>([])
//   const [isListResponseSuccess, setIsListResponseSuccess] = useState(false)
//   const [listResponseError, setListResponseError] = useState<string>()

//   useEffect(() => {
//     const fetchProjects = async (): Promise<void> => {
//       try {
//         // Electron IPC call to get projects from main process
//         const response = await window.api.listProjects()
//         setProjects(response.result || [])
//         setListResponseError(response.error?.message)
//         setIsListResponseSuccess(response.success)
//       } catch (error) {
//         console.error('Failed to load projects:', error)
//         setProjects([])
//       }
//     }
//     fetchProjects()
//   }, [setProjects])

//   // Setup Fuse.js for fuzzy searching on 'link'
//   const fuse = new Fuse(projects, { keys: ['link'], threshold: 0.8 })

//   const filteredProjects = query ? fuse.search(query).map((result) => result.item) : projects

//   return (
//     <div className="p-2 space-y-8 grid grid-rows-[min-content_1fr] overflow-hidden h-full ">
//       <div className="px-2">
//         <Input
//           placeholder="Search projects..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//       </div>
//       <ScrollArea className="px-3  overflow-auto">
//         <Masonry columnsCount={2} gutter="16px">
//           {filteredProjects.map((project, id) => (
//             <ProjectCard projectEntry={project} key={id}></ProjectCard>
//           ))}
//         </Masonry>
//       </ScrollArea>

//       {filteredProjects.length === 0 && (
//         <div className="text-center py-8">
//           <p className="text-gray-500">
//             {projects?.length === 0 ? 'No projects available' : 'No projects match your search'}
//           </p>
//         </div>
//       )}
//     </div>
//   )
// }

import React, { useState } from 'react'

import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import { ProjectsList } from './projects-list'

export const ProjectsPage = (): React.ReactElement => {
  const [query, setQuery] = useState('')

  return (
    <div className="flex flex-col h-full p-4 space-y-4 overflow-hidden">
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search projects by name or path..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
      </div>
      <ScrollArea className="flex-1 overflow-auto">
        <ProjectsList query={query} />
      </ScrollArea>
    </div>
  )
}

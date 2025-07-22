/* eslint-disable react-refresh/only-export-components */
// src/contexts/ProjectsContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { AppMoreData, AppProject, AppProjectEntry, AppProjectType } from '../../../../types/project'

interface ProjectsContextType {
  projects: AppProjectEntry[]
  loading: boolean
  error: string | null
  refreshProjects: () => Promise<void>
  getProjectData: (link: string) => Promise<AppProject | null>
  getMoreData: (link: string) => Promise<AppMoreData | null>
  addProject: () => Promise<AppProjectEntry[] | null>
  deleteProject: (link: string) => Promise<void>
  openIn: (link: string, inApp: string) => Promise<void>
  runScript: (link: string, script: string) => Promise<void>
  detectProjectType: (link: string) => Promise<AppProjectType | null>
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined)

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<AppProjectEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await window.api.listProjects()

      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to load projects')
      }

      setProjects(response.result || [])
      setError(null)
    } catch (err) {
      console.error('Failed to load projects:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      setProjects([])
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshProjects = useCallback(async (): Promise<void> => {
    await fetchProjects()
  }, [fetchProjects])

  const getProjectData = useCallback(async (link: string): Promise<AppProject | null> => {
    try {
      const response = await window.api.getProjectData(link)

      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to get project data')
      }

      return response.result || null
    } catch (err) {
      console.error('Failed to get project data:', err)
      throw err
    }
  }, [])

  const getMoreData = useCallback(async (link: string): Promise<AppMoreData | null> => {
    try {
      const response = await window.api.getMoreData(link)

      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to get additional project data')
      }

      return response.result || null
    } catch (err) {
      console.error('Failed to get additional project data:', err)
      throw err
    }
  }, [])

  const addProject = useCallback(async (): Promise<AppProjectEntry[] | null> => {
    try {
      setLoading(true)
      const response = await window.api.addProject()

      if (response.isCanceled) {
        return null
      }

      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to add project')
      }

      await refreshProjects()
      return response.result || null
    } catch (err) {
      console.error('Failed to add project:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [refreshProjects])

  const deleteProject = useCallback(
    async (link: string): Promise<void> => {
      try {
        setLoading(true)
        const response = await window.api.deleteProject(link)

        if (!response.success) {
          throw new Error(response.error?.message || 'Failed to delete project')
        }

        await refreshProjects()
      } catch (err) {
        console.error('Failed to delete project:', err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [refreshProjects]
  )

  const openIn = useCallback(async (link: string, openIn: string): Promise<void> => {
    try {
      const response = await window.api.openIn(link, openIn)

      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to open project')
      }
    } catch (err) {
      console.error('Failed to open project:', err)
      throw err
    }
  }, [])

  const runScript = useCallback(async (link: string, script: string): Promise<void> => {
    try {
      const response = await window.api.runScript(link, script)

      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to run script')
      }
    } catch (err) {
      console.error('Failed to run script:', err)
      throw err
    }
  }, [])

  const detectProjectType = useCallback(async (link: string): Promise<AppProjectType> => {
    try {
      const response = await window.api.detectProjectType(link)

      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to detect project type')
      }

      return response.result || AppProjectType.UNKNOWN
    } catch (err) {
      console.error('Failed to detect project type:', err)
      throw err
    }
  }, [])

  // Initial load
  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        error,
        refreshProjects,
        getProjectData,
        getMoreData,
        addProject,
        deleteProject,
        openIn,
        runScript,
        detectProjectType
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export const useProjects = (): ProjectsContextType => {
  const context = useContext(ProjectsContext)
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider')
  }
  return context
}

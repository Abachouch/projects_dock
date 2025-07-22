import { AppMoreData, AppProject, AppProjectEntry } from 'src/types/project'

// src/services/project-service.ts
export const ProjectService = {
  async listProjects(): Promise<{
    success: boolean
    result?: AppProjectEntry[] | undefined
    error?: { message: string } | undefined
  }> {
    return await window.api.listProjects()
  },

  async getProject(link: string): Promise<{
    success: boolean
    result?: AppProject
    error?: {
      message: string
    }
  }> {
    return await window.api.getProjectData(link)
  },

  async getMoreData(link: string): Promise<{
    success: boolean
    result?: AppMoreData
    error?: {
      message: string
    }
  }> {
    return await window.api.getMoreData(link)
  },

  async addProject(): Promise<{
    success: boolean
    result?: AppProjectEntry[]
    error?: {
      message: string
    }
    isCanceled: boolean
  }> {
    return await window.api.addProject()
  },

  async deleteProject(link: string): Promise<{
    success: boolean
    error?: {
      message: string
    }
  }> {
    return window.api.deleteProject(link)
  },

  async openIn(
    link: string,
    openIn: string
  ): Promise<{
    success: boolean
    error?: {
      message: string
    }
  }> {
    return window.api.openIn(link, openIn)
  },
  async runScript(
    link: string,
    script: string
  ): Promise<{
    success: boolean
    error?: {
      message: string
    }
  }> {
    return window.api.runScript(link, script)
  }
}

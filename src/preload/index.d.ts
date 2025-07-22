import { ElectronAPI } from '@electron-toolkit/preload'
import { AppMoreData, AppProject, AppProjectEntry, AppProjectType } from 'src/types/project'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      listProjects: () => Promise<{
        success: boolean
        result?: AppProjectEntry[]
        error?: {
          message: string
        }
      }>
      getProjectData: (link: string) => Promise<{
        success: boolean
        result?: AppProject
        error?: {
          message: string
        }
      }>
      getMoreData: (link: string) => Promise<{
        success: boolean
        result?: AppMoreData
        error?: {
          message: string
        }
      }>
      addProject: () => Promise<{
        success: boolean
        result?: AppProjectEntry[]
        error?: {
          message: string
        }
        isCanceled: boolean
      }>
      deleteProject: (link: string) => Promise<{
        success: boolean
        error?: {
          message: string
        }
      }>
      openIn: (
        link: string,
        openIn: string
      ) => Promise<{
        success: boolean
        error?: {
          message: string
        }
      }>
      runScript: (
        link: string,
        script: string
      ) => Promise<{
        success: boolean
        error?: {
          message: string
        }
      }>
      detectProjectType: (link: string) => Promise<{
        success: boolean
        result?: AppProjectType
        error?: {
          message: string
        }
      }>
      openFile: (link: string) => Promise<{
        success: boolean
        error?: {
          message: string
        }
      }>
      closeApp: () => void
    }
  }
}

import { AppProject } from './project'

export type AppPage = 'home' | 'settings' | 'details'
export type AppTab = 'shortcuts' | 'notes' | 'media' | 'tasks' | 'meta'

export interface AppView {
  page: AppPage
  tab: AppTab | undefined
  currentProjectId: number | undefined
  projects: AppProject[] | undefined
}

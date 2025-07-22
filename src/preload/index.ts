import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  listProjects: () => electronAPI.ipcRenderer.invoke('project:list'),
  getProjectData: (projectLink: string) =>
    electronAPI.ipcRenderer.invoke('project:data', projectLink),
  getMoreData: (link: string) => electronAPI.ipcRenderer.invoke('project:moreData', link),
  addProject: () => electronAPI.ipcRenderer.invoke('project:add'),
  deleteProject: (link: string) => electronAPI.ipcRenderer.invoke('project:delete', link),

  openIn: (link: string, openIn: string) =>
    electronAPI.ipcRenderer.invoke('project:openIn', link, openIn),
  runScript: (link: string, script: string) =>
    electronAPI.ipcRenderer.invoke('script:run', link, script),
  detectProjectType: (link: string) => electronAPI.ipcRenderer.invoke('project:detectType', link),
  openFile: (link: string) => electronAPI.ipcRenderer.invoke('file:open', link),
  closeApp: () => electronAPI.ipcRenderer.send('app:close')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

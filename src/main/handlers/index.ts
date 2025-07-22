import * as ProjectHandlers from './projects/index'
import * as ScriptHandlers from './scripts/index'
import * as FileHandlers from './file/index'
import { ipcMain } from 'electron'

export const registerHandlers = (): void => {
  ipcMain.handle('project:list', ProjectHandlers.handleListProjects)
  ipcMain.handle('project:data', ProjectHandlers.handleGetProjectData)
  ipcMain.handle('project:moreData', ProjectHandlers.handleGetMoreProjectData)
  ipcMain.handle('project:add', ProjectHandlers.handleAddProject)
  ipcMain.handle('project:delete', ProjectHandlers.handleDeleteProject)
  ipcMain.handle('project:openIn', ProjectHandlers.handleOpenProjectIn)
  ipcMain.handle('project:detectType', ProjectHandlers.handleDetectProjectType)
  //script
  ipcMain.handle('script:run', ScriptHandlers.handleRunScript)
  // files
  ipcMain.handle('file:open', FileHandlers.handleOpenFile)
}

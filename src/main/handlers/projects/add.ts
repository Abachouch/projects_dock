import { dialog } from 'electron'
import { database } from '../../controller/databse'
import { AppProjectEntry, AppProjectType } from '../../../types/project'
import { detectProjectType } from '../../controller/detect-project-type'

export const handleAddProject = async (): Promise<{
  success: boolean
  result?: AppProjectEntry[]
  error?: { message: string }
  isCanceled: boolean
}> => {
  try {
    // open file explorer to select folder
    const selectedFolders = await dialog.showOpenDialog({
      properties: ['openDirectory', 'multiSelections'],
      title: 'Select Projects Root',
      buttonLabel: 'Select Projects'
    })

    if (selectedFolders.canceled || selectedFolders.filePaths.length === 0)
      throw new Error('No folder selected')
    const projectEntries: AppProjectEntry[] = []

    if (selectedFolders.filePaths.length > 0) {
      for (let i = 0; i < selectedFolders.filePaths.length; i++) {
        const folder = selectedFolders.filePaths[i]
        let type = await detectProjectType(folder)
        if (type === AppProjectType.DELETED) continue
        if (type === 'Error') type = AppProjectType.UNKNOWN
        const projectEntry = await database.create({ link: folder, type: type })
        projectEntries.push(projectEntry)
      }
    }
    return { success: true, result: projectEntries, isCanceled: false }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: { message: error.message },
        isCanceled: error.message === 'No folder selected'
      }
    } else {
      return { success: false, error: { message: 'An unknown error occurred' }, isCanceled: false }
    }
  }
}

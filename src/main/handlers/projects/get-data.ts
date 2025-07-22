import { getProjectData } from '../../controller/get-project-data'
import { AppProject } from '../../../types/project'

export const handleGetProjectData = async (
  _event: unknown,
  link: string
): Promise<{
  success: boolean
  result?: AppProject
  error?: { message: string }
}> => {
  try {
    const projectData = await getProjectData(link)
    return { success: true, result: projectData }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: { message: error.message } }
    } else {
      return {
        success: false,
        error: { message: 'An unknown error occurred getting project DATA' }
      }
    }
  }
}

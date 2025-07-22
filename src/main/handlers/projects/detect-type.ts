import { AppProjectType } from '../../../types/project'
import { detectProjectType } from '../../controller/detect-project-type'

export const handleDetectProjectType = async (
  _event: unknown,
  link: string
): Promise<{
  success: boolean
  result?: AppProjectType
  error?: { message: string }
}> => {
  try {
    const projectType = await detectProjectType(link)
    if (projectType === 'Error') throw new Error('Error detecting project type')
    return { success: true, result: projectType }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: { message: error.message } }
    } else {
      return {
        success: false,
        error: { message: 'An unknown error occurred detecting project type' }
      }
    }
  }
}

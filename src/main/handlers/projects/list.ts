import { database } from '../../controller/databse'
import { AppProjectEntry } from '../../../types/project'

export const handleListProjects = async (): Promise<{
  success: boolean
  result?: AppProjectEntry[]
  error?: { message: string }
}> => {
  try {
    const projects = await database.list()
    return { success: true, result: projects }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: { message: error.message } }
    } else {
      return { success: false, error: { message: 'An unknown error occurred' } }
    }
  }
}

import { database } from '../../controller/databse'

export const handleDeleteProject = async (
  _event,
  link: string
): Promise<{
  success: boolean
  error?: { message: string }
}> => {
  try {
    const numDeleted = await database.delete(link)
    return { success: numDeleted != 0 }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: { message: error.message } }
    } else {
      return { success: false, error: { message: 'An unknown error occurred' } }
    }
  }
}

import { readReadme } from '../../controller/parse-readme-file'
import { parseTodoFile } from '../../controller/parse-todo-file'
import { AppMoreData } from '../../../types/project'

export const handleGetMoreProjectData = async (
  _event: unknown,
  link: string
): Promise<{
  success: boolean
  result?: AppMoreData
  error?: { message: string }
}> => {
  try {
    const [readme, tasks] = await Promise.all([readReadme(link), parseTodoFile(link)])

    const moreProjectData: AppMoreData = {
      readme: readme,
      tasks: tasks
    }

    return { success: true, result: moreProjectData }
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

import { spawn } from 'child_process'

export const handleOpenFile = async (
  _event: unknown,
  link: string
): Promise<{
  success: boolean
  error?: { message: string }
}> => {
  try {
    // open file in associated app
    spawn('start', ['""', link], {
      shell: true,
      detached: true,
      stdio: 'ignore'
    })

    return { success: true }
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

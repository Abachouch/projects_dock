import { exec } from 'child_process'
import { shell } from 'electron'
import { normalize } from 'path'

export const handleOpenProjectIn = async (
  _event,
  link: string,
  openIn: string
): Promise<{
  success: boolean
  error?: { message: string }
}> => {
  const platform = process.platform

  const normalizedLink = normalize(link)

  try {
    switch (openIn) {
      case 'vscode':
        exec(`code "${normalizedLink}"`, (error) => {
          if (error) {
            // Fallback options if direct 'code' command fails
            if (platform === 'win32') {
              exec(`code.cmd "${normalizedLink}"`)
            } else if (platform === 'darwin') {
              exec(`open -a "Visual Studio Code" "${normalizedLink}"`)
            }
          }
        })
        break
      case 'explorer':
        shell.openPath(normalizedLink)
        break
      case 'terminal':
        if (platform === 'darwin') {
          // macOS
          exec(`open -a Terminal "${normalizedLink}"`)
        } else if (platform === 'win32') {
          // Windows
          exec(`start cmd.exe /K "cd /d ${normalizedLink}"`)
        } else if (platform === 'linux') {
          // Linux (assuming GNOME Terminal)
          exec(`gnome-terminal --working-directory="${normalizedLink}"`)
        } else {
          throw new Error('Unsupported platform')
        }

        break
      default:
        shell.openExternal(normalizedLink)
        break
    }

    return { success: true }
  } catch (error) {
    if (error instanceof Error) return { success: false, error: { message: error.message } }
    else
      return {
        success: false,
        error: { message: 'An unknown error occurred Opening folder in app' }
      }
  }
}

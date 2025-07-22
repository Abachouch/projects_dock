import { exec } from 'child_process'
import { normalize } from 'path'

export const handleRunScript = async (
  _event: Electron.IpcMainInvokeEvent,
  link: string,
  script: string
): Promise<{
  success: boolean
  error?: { message: string }
}> => {
  return new Promise((resolve, reject) => {
    const normalizedPath = normalize(link)
    const isWindows = process.platform === 'win32'
    let command: string

    if (isWindows) {
      // Windows command - using cmd.exe with /K to keep window open
      command = `start cmd.exe /K "cd /D "${normalizedPath}" && npm run ${script}"`
    } else {
      // macOS/Linux command - using terminal emulator (defaults to x-terminal-emulator)
      command = `x-terminal-emulator -e 'bash -c "cd "${normalizedPath}" && npm run ${script} && echo "Press any key to continue..." && read -n1""'`
    }

    exec(command, (error) => {
      if (error) {
        reject({
          success: false,
          error: error.message
        })
        return
      }
      resolve({
        success: true
      })
    })
  })
}

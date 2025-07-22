import { readFile } from 'fs/promises'
import { join } from 'path'

export const readReadme = async (projectLink: string): Promise<string | undefined> => {
  try {
    const filePath = join(projectLink, 'README.md')
    console.log(`Reading ${filePath}`)
    const fileContent = await readFile(filePath, 'utf-8')
    return fileContent
  } catch (error) {
    console.error('Error reading README.md:', error)
    return undefined
  }
}

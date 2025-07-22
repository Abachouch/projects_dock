import { readFile } from 'fs/promises'
import { join } from 'path'
import { AppProject, AppProjectType, AppScript } from '../../types/project'

// Get parsed package file
export const parsePackageFile = async (projectLink: string): Promise<AppProject> => {
  try {
    const filePath = join(projectLink, 'package.json')
    const fileContent = await readFile(filePath, 'utf-8')
    const packageJson = JSON.parse(fileContent)

    const scripts: AppScript[] = packageJson.scripts
      ? Object.entries(packageJson.scripts).map(([name, command]) => ({
          name,
          command: command as string
        }))
      : []

    return {
      name: packageJson.name,
      description: packageJson.description,
      thumbnail: packageJson.thumbnail,
      icon: packageJson.icon,
      keywords: packageJson.keywords,
      scripts,
      link: projectLink,
      type: AppProjectType.NODE,
      id: undefined
    }
  } catch (error) {
    console.error('Error reading package.json:', error)
    return {
      name: undefined,
      description: undefined,
      thumbnail: undefined,
      icon: undefined,
      keywords: undefined,
      scripts: undefined,
      link: projectLink,
      type: AppProjectType.NODE,
      id: undefined
    }
  }
}

import { AppProject } from '../../types/project'
import { parsePackageFile } from './parse-package-file'
import { join, normalize } from 'path'

// Get full project details and tasks
export const getProjectData = async (projectLink: string): Promise<AppProject> => {
  const packageFile = await parsePackageFile(projectLink)
  return {
    ...packageFile,
    link: projectLink,
    icon: packageFile.icon && normalize(join(projectLink, packageFile.icon)),
    thumbnail: packageFile.thumbnail && normalize(join(projectLink, packageFile.thumbnail))
  }
}

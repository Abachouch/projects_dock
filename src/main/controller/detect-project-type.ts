import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import { AppProjectType } from '../../types/project'

export const detectProjectType = async (link: string): Promise<AppProjectType | 'Error'> => {
  try {
    const files = await readdir(link)
    const has = (name: string): boolean => files.includes(name)
    const hasAny = (names: string[]): boolean => names.some((name) => files.includes(name))
    const hasFileWithExt = (ext: string): boolean => files.some((file) => file.endsWith(ext))

    if (has('package.json')) {
      const pkgPath = join(link, 'package.json')
      const pkgContent = await readFile(pkgPath, 'utf-8')
      const pkg = JSON.parse(pkgContent)
      const deps = { ...pkg.dependencies, ...pkg.devDependencies }

      if (deps['next']) return AppProjectType.NEXT
      if (deps['react']) return AppProjectType.REACT
      if (deps['vue']) return AppProjectType.VUE
      if (deps['svelte']) return AppProjectType.SVELTE
      if (deps['express']) return AppProjectType.EXPRESS

      return AppProjectType.NODE
    }

    if (hasAny(['build.gradle', 'AndroidManifest.xml'])) return AppProjectType.ANDROID
    if (has('_config.yml') && hasFileWithExt('.md')) return AppProjectType.JEKYLL
    if (has('pubspec.yaml')) return AppProjectType.FLUTTER
    if (has('pom.xml')) return AppProjectType.JAVA
    if (hasAny(['requirements.txt', 'setup.py'])) return AppProjectType.PYTHON

    return AppProjectType.UNKNOWN
  } catch (err) {
    if (err instanceof Error && 'code' in err && err.code === 'ENOENT') {
      return AppProjectType.DELETED
    }
    console.error('Error reading folder:', err)
    return 'Error'
  }
}

export type AppProject = {
  id: string | undefined
  link: string
  name: string | undefined
  description: string | undefined
  thumbnail: string | undefined
  icon: string | undefined
  keywords: string[] | undefined
  scripts: AppScript[] | undefined
  type: AppProjectType | AppProjectType.UNKNOWN
}

export type AppMoreData = {
  readme: string | undefined
  tasks: AppTask[] | undefined
}

export type AppProjectEntry = {
  id: string
  link: string
  type: AppProjectType
}

export type AppScript = {
  name: string
  command: string
}

export type AppTask = {
  description: string
  priority: 'critical' | 'high' | 'regular' | 'low'
  isDone: boolean
}

export enum AppProjectType {
  DELETED = 'Deleted',
  FOLDER = 'Folder',
  REACT = 'React',
  VUE = 'Vue.js',
  SVELTE = 'Svelte',
  NODE = 'Node.js',
  FLUTTER = 'Flutter',
  ANDROID = 'Android',
  JEKYLL = 'Jekyll',
  NEXT = 'Next.js',
  EXPRESS = 'Express.js',
  JAVA = 'Java (Maven)',
  PYTHON = 'Python',
  UNKNOWN = 'Unknown'
}

import { readFile } from 'fs/promises'
import { join } from 'path'
import { AppTask } from '../../types/project'

// Parse todo file
export const parseTodoFile = async (projectLink: string): Promise<AppTask[] | undefined> => {
  try {
    const filePath = join(projectLink, '.todo')
    console.log(`Reading ${filePath}`)

    const fileContent = await readFile(filePath, 'utf-8')
    const lines = fileContent.split('\n')

    const todos: AppTask[] = []

    for (const line of lines) {
      const trimmedLine = line.trim()

      // Skip headers, empty lines, and notes
      if (trimmedLine.startsWith('#') || trimmedLine === '' || !trimmedLine.match(/^\[.*\]/)) {
        continue
      }

      const match = trimmedLine.match(/^\[(.*)\]\s+(.*)$/)
      if (!match) continue

      const [, status, description] = match
      const isDone = status.includes('x')

      let priority: 'critical' | 'high' | 'regular' | 'low' = 'regular'
      if (status.includes('!!')) {
        priority = 'critical'
      } else if (status.includes('!')) {
        priority = 'high'
      } else if (status.includes('~')) {
        priority = 'low'
      }

      todos.push({
        description: description.trim(),
        priority,
        isDone
      })
    }

    return todos
  } catch (error) {
    console.error('Error reading todo file:', error)
    return undefined
  }
}

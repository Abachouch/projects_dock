import { describe, it, expect, vi, Mock } from 'vitest'
import { AppTask } from '../../types/project'
import * as fs from 'fs/promises'
import { parseTodoFile } from '../controller/parse-todo-file'

// Mock fs.readFile to prevent actual file system operations
vi.mock('fs/promises', () => ({
  readFile: vi.fn()
}))

describe('parseTodoFile', () => {
  it('should parse todos correctly', async () => {
    ;(fs.readFile as Mock).mockResolvedValue(`# Dev
[ ] Create ParseTodoFile(linkToTodoFile:string)
[!] Create ParseJsonFile(linkToPackageJsonFile:string)

# Design
[x] Design Home Page
[~] Add colors And themes

# Notes
This line is a note but not a Todo.
End of file`)

    const expected: AppTask[] = [
      {
        description: 'Create ParseTodoFile(linkToTodoFile:string)',
        priority: 'regular',
        isDone: false
      },
      {
        description: 'Create ParseJsonFile(linkToPackageJsonFile:string)',
        priority: 'high',
        isDone: false
      },
      { description: 'Design Home Page', priority: 'regular', isDone: true },
      { description: 'Add colors And themes', priority: 'low', isDone: false }
    ]

    const todos = await parseTodoFile('c:/myFolder/.todo')
    expect(todos).toEqual(expected)
  })

  it('should return an empty array when file is empty', async () => {
    ;(fs.readFile as Mock).mockResolvedValue('')

    const todos = await parseTodoFile('c:/myFolder/.todo')
    expect(todos).toEqual([])
  })

  it('should handle missing priority markers correctly', async () => {
    ;(fs.readFile as Mock).mockResolvedValue(`[ ] Task without priority`)

    const expected: AppTask[] = [
      { description: 'Task without priority', priority: 'regular', isDone: false }
    ]

    const todos = await parseTodoFile('c:/myFolder/.todo')
    expect(todos).toEqual(expected)
  })

  it('should handle critical priority correctly', async () => {
    ;(fs.readFile as Mock).mockResolvedValue(`[!!] Urgent Task`)

    const expected: AppTask[] = [
      { description: 'Urgent Task', priority: 'critical', isDone: false }
    ]

    const todos = await parseTodoFile('c:/myFolder/.todo')
    expect(todos).toEqual(expected)
  })

  it('should ignore headers and notes', async () => {
    ;(fs.readFile as Mock).mockResolvedValue(`# Section
This is a random note.
[x] Completed Task`)

    const expected: AppTask[] = [
      { description: 'Completed Task', priority: 'regular', isDone: true }
    ]

    const todos = await parseTodoFile('c:/myFolder/.todo')
    expect(todos).toEqual(expected)
  })
})

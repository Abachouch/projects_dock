import { app } from 'electron'
import Datastore from 'nedb-promises'
import path from 'path'
import { AppProjectEntry } from '../../types/project'

const db = Datastore.create({
  filename: path.join(app.getPath('userData'), 'projects.db'),
  autoload: true,
  timestampData: true
})

db.ensureIndex({ fieldName: 'link', unique: true })

export const database = {
  async create(doc: Omit<AppProjectEntry, 'id'>): Promise<AppProjectEntry> {
    const id = Date.now().toString()
    return db.insert({ ...doc, id })
  },

  async read(id: string): Promise<AppProjectEntry | null> {
    return db.findOne({ id })
  },

  async find(projectLink: string): Promise<AppProjectEntry | null> {
    return db.findOne({ link: projectLink })
  },

  async delete(link: string): Promise<number> {
    return db.remove({ link }, { multi: false })
  },

  async list(): Promise<AppProjectEntry[]> {
    return db.find({})
  }
}

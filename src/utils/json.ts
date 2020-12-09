import fs from 'fs/promises'
import path from 'path'

export class JsonFolderParser {
  private folderPath: string
  constructor(folderPath: string) {
    this.folderPath = folderPath
  }

  private filePath(name: string) {
    const fileName = `${name}.json`
    return path.join(this.folderPath, fileName)
  }

  public async read(name: string): Promise<Array<Record<string, unknown>>> {
    const filePath = this.filePath(name)
    const contents = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(contents)
  }

  public async write(name: string, obj: Array<Record<string, unknown>>): Promise<void> {
    const filePath = this.filePath(name)
    const contents = JSON.stringify(obj, null, 2)
    await fs.writeFile(filePath, contents, 'utf-8')
  }
}
import FS from 'fs'
import path from 'path'
const fs = FS.promises

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
    let result = []
    try {
      const contents = await fs.readFile(filePath, 'utf-8')
      result = JSON.parse(contents)
    } catch {
      console.log('Error loading file')
    }
    return result
  }

  public async write(name: string, obj: Array<Record<string, unknown>>): Promise<void> {
    const filePath = this.filePath(name)
    const contents = JSON.stringify(obj, null, 2)
    console.log('write', filePath, contents)
    await fs.writeFile(filePath, contents, 'utf-8')
  }
}
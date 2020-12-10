import path from 'path'

const config = {
  connectors: {
    mainDatabase: {
      type: path.join(__dirname, '..', '..', '..'),
      config: {
        folderPath: path.join(__dirname, '..', 'storage') 
      },
    }
  }
}
export default config
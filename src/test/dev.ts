import { Connector } from '../index'
import http from 'http'
import path from 'path'
import config from './configs/MCconfig'
import settings from './configs/MCsettings'
import { Funfunz } from '@funfunz/core'

const funfunz = new Funfunz({
  config,
  // @ts-ignore
  settings
})

export const connector = new Connector(
  {
    type: 'json',
    config: {
      folder: path.join(__dirname, 'storage')
    }
  },
  funfunz
)

const server = http.createServer(funfunz.middleware)
server.listen(3000)
import Debug from 'debug'
import type { ICreateArgs, IQueryArgs, IRemoveArgs, IUpdateArgs, DataConnector, IDataConnector } from '@funfunz/core/lib/types/connector'
import type { IFilter } from '@funfunz/core/lib/middleware/utils/filter'
import { JsonFolderParser } from './utils/json'
import { expression } from './utils/expression'

const debug = Debug('funfunz:SQLDataConnector')

interface IJsonConnectorConfig {
  folderPath: string
}

export class Connector implements DataConnector{
  public connection: IJsonConnectorConfig
  private json: JsonFolderParser
  constructor(connector: IDataConnector) {
    this.connection = {
      ...connector.config as IJsonConnectorConfig
    }
    this.json = new JsonFolderParser(this.connection.folderPath)
    debug('Start')
    Object.keys(connector).forEach(
      (key) => {
        debug(key, (connector)[key])
      }
    )
    debug('End')
  }

  public async query(args: IQueryArgs): Promise<Record<string, unknown>[] | number> {
    
    let results: Record<string, unknown>[] = await this.json.read(args.entityName)

    if (args.filter) {
      results = this.filter(results, args.filter)
    }
    if (args.skip || args.take) {
      results = this.paginate(results, args.skip, args.take)
    }
    if (args.count) {
      return this.count(results)
    } 
    if (args.fields) {
      return this.select(results, args.fields)
    }
    return results
  }

  public async update(args: IUpdateArgs): Promise<Record<string, unknown>[] | number> {

    const results: Record<string, unknown>[] = await this.json.read(args.entityName)

    const toUpdate = this.filter(results, args.filter)

    toUpdate.forEach((itemToUpdate) => {
      const index = results.findIndex(item => item === itemToUpdate)
      Object.keys(args.data).forEach((key) => {
        results[index][key] = args.data[key]
      })
      results[index]
    })

    await this.json.write(args.entityName, results)

    return toUpdate.length
  }

  public async create(args: ICreateArgs): Promise<Record<string, unknown>[] | Record<string, unknown> | number> {

    const results: Record<string, unknown>[] = await this.json.read(args.entityName)

    results.push(args.data)

    return args.data
  }

  public async remove(args: IRemoveArgs): Promise<number> {

    const beforeDelete: Record<string, unknown>[] = await this.json.read(args.entityName)

    const toDelete = this.filter(beforeDelete, args.filter)

    const afterDelete = beforeDelete.filter((item) => {
      return toDelete.includes(item)
    })

    await this.json.write(args.entityName, afterDelete)

    return toDelete.length
  }

  private paginate(results: Array<unknown>, skip = 0, take = 0) {
    return results.filter((item, index) => {
      return index >= skip && index <= skip + take
    }) as Record<string, unknown>[]
  }

  private select(results: Array<Record<string, unknown>>, fields: string[]) {
    return results.map((item) => {
      const normalizedItem: Record<string, unknown> = {}
      fields.forEach((field) => {
        normalizedItem[field] = item[field]
      })
      return normalizedItem
    }) as Record<string, unknown>[]
  }

  private count(results: Array<unknown>) {
    return results.length
  }

  private filter(results: Record<string, unknown>[], filters: IFilter): Record<string, unknown>[] {
    return results.filter((item) => {
      return expression(item, filters)
    })
  }
}
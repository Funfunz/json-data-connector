import path from 'path'
import { Connector } from '../index'
import config from './configs/MCconfig'
import settings from './configs/MCsettings'
import { Funfunz } from '@funfunz/core'

jest.mock('@funfunz/core', () => {
  return {
    Funfunz: function ({config: configData, settings: settingsData}) {
      return {
        config: () => {
          console.log(configData, settingsData)
          return {
            config: configData,
            settings: settingsData
          }
        }
      }
    }
  }
})

const connector = new Connector(
  {
    type: 'json',
    config: {
      folderPath: path.join(__dirname, 'storage')
    }
  },
  new Funfunz({
    config,
    // @ts-ignore
    settings
  })
)

describe('JSON Data Connector', () => {
  it('Should return a list of results', (done) => {
    const fields  = [
      'id',
      'name'
    ]
    return connector.query({
      entityName: 'products',
      fields,
      filter: {
        id: {
          _in: [1,2]
        }
      },
      skip: 0,
      take: 2,
    }).then(
      (result) => {
        const typedResult = result as Record<string, unknown>[]
        expect(typedResult.length).toBe(2)
        expect(Object.keys(typedResult[0]).filter(
          key => {
            return fields.includes(key)
          }
        ).length).toBe(fields.length)
        return done()
      }
    )
  })

  it('Should return a list of results, complex query', (done) => {
    const fields  = [
      'id',
      'name'
    ]
    return connector.query({
      entityName: 'products',
      fields,
      filter: {
        _or: [
          {
            _and: [
              {
                id: {
                  _eq: 1
                }
              },
              {
                id: {
                  _neq: 2
                }
              },
              {
                id: {
                  _lte: 1
                }
              },
              {
                id: {
                  _lt: 2
                }
              },
              {
                id: {
                  _gte: 1
                }
              },
              {
                id: {
                  _gt: 0
                }
              },
              {
                id: {
                  _nin: [2,3]
                }
              },
              {
                name: {
                  _like: 'Product'
                }
              },
              {
                name: {
                  _nlike: 'User'
                }
              },
            ],
          },
          {
            _and: [
              {
                id: {
                  _eq: 2
                }
              },
              {
                name: {
                  _like: 'Product'
                }
              },
            ],
          },
          {
            id: {
              _is_null: true
            }
          }
        ]
      }
    }).then(
      (result) => {
        const typedResult = result as Record<string, unknown>[]
        expect(typedResult.length).toBe(2)
        expect(Object.keys(typedResult[0]).filter(
          key => {
            return fields.includes(key)
          }
        ).length).toBe(fields.length)
        return done()
      }
    )
  })

  it('Should return a list of paginated results with skip', (done) => {
    const fields  = [
      'id',
      'name'
    ]
    return connector.query({
      entityName: 'products',
      fields,
      filter: {
        id: {
          _in: [1,2]
        }
      },
      skip: 1,
    }).then(
      (result) => {
        console.log(result)
        const typedResult = result as Record<string, unknown>[]
        expect(typedResult.length).toBe(1)
        expect(Object.keys(typedResult[0]).filter(
          key => {
            return fields.includes(key)
          }
        ).length).toBe(fields.length)
        return done()
      }
    )
  })

  it('Should return a list of paginated results with take', (done) => {
    const fields  = [
      'id',
      'name'
    ]
    return connector.query({
      entityName: 'products',
      fields,
      filter: {
        id: {
          _in: [1,2]
        }
      },
      take: 1,
    }).then(
      (result) => {
        console.log(result)
        const typedResult = result as Record<string, unknown>[]
        expect(typedResult.length).toBe(1)
        expect(Object.keys(typedResult[0]).filter(
          key => {
            return fields.includes(key)
          }
        ).length).toBe(fields.length)
        return done()
      }
    )
  })

  it('Should count the quantity of products', (done) => {
    return connector.query({
      entityName: 'products',
      count: true,
      fields: [], 
    }).then(
      (result) => {
        expect(result).toBeTruthy()
        return done()
      }
    )
  })

  it('Should create a new product', (done) => {
    return connector.create({
      entityName: 'products',
      data: {
        id: 4,
        name: 'Name 4',
        color: 'black'
      },
      fields: [
        'id',
        'name'
      ]
    }).then(
      (result) => {
        const typedResult = result as Record<string, unknown>[]
        expect(typedResult[0].id).toBeTruthy()
        expect(typedResult[0].name).toBe('Name 4')
        return done()
      }
    )
  })

  it('Should update a product', (done) => {
    return connector.update({
      entityName: 'products',
      data: {
        name: 'Name 44'
      },
      filter: {
        id: {
          _eq: 4
        }
      },
      fields: [
        'id',
        'name'
      ]
    }).then(
      (result) => {
        const typedResult = result as Record<string, unknown>[]
        expect(typedResult[0].id).toBeTruthy()
        expect(typedResult[0].name).toBe('Name 44')
        return done()
      }
    )
  })

  it('If the filter matchs 0 items, return an empty array', (done) => {
    return connector.update({
      entityName: 'products',
      data: {
        name: 'Other',
      },
      filter: {
        id: {
          _eq: 9
        }
      },
      fields: [
        'id',
        'name'
      ]
    }).then(
      (result) => {
        const typedResult = result as Record<string, unknown>[]
        expect(typedResult.length).toBe(0)
        return done()
      }
    )
  })

  it('Should not update a product because of no match', (done) => {
    return connector.update({
      entityName: 'products',
      data: {
        name: 'Product',
      },
      filter: {
        id: {
          _eq: 98765
        }
      },
      fields: [
        'id',
        'name'
      ]
    }).then(
      (result) => {
        const typedResult = result as Record<string, unknown>[]
        expect(typedResult.length).toBe(0)
        return done()
      }
    )
  })

  it('Should delete a product', (done) => {
    return connector.remove({
      entityName: 'products',
      filter: {
        id: {
          _eq: 4
        }
      }
    }).then(
      (result) => {
        expect(result).toBe(1)
        return done()
      }
    )
  })
})

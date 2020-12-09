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
    type: 'sql',
    config: {
      client: 'mysql2',
      host: "127.0.0.1",
      database: "test_db",
      user: "root",
      password: process.env.DB_PASSWORD || 'root',
      port: "3306"
    }
  },
  new Funfunz({
    config,
    settings
  })
)

let familyTestName = 'TestFamily'
let familyUpdatedTestName = 'UpdatedTestFamily'
let createdId: number

describe('SQL Data Connector', () => {
  it('Should return a list of results', (done) => {
    const fields  = [
      'id',
      'name'
    ]
    return connector.query({
      entityName: 'families',
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
      entityName: 'families',
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
                  _like: '%one'
                }
              },
              {
                name: {
                  _nlike: 'one'
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
                  _like: '%two'
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
      entityName: 'families',
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
      entityName: 'families',
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

  it('Should count the quantity of families', (done) => {
    return connector.query({
      entityName: 'families',
      count: true,
      fields: [], 
    }).then(
      (result) => {
        expect(result).toBeTruthy()
        return done()
      }
    )
  })

  it('Should create a new family', (done) => {
    return connector.create({
      entityName: 'families',
      data: {
        name: familyTestName,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      fields: [
        'id',
        'name'
      ]
    }).then(
      (result) => {
        const typedResult = result as Record<string, unknown>[]
        expect(typedResult[0].id).toBeTruthy()
        createdId = typedResult[0].id as number
        expect(typedResult[0].name).toBe(familyTestName)
        return done()
      }
    )
  })

  it('Should update a family', (done) => {
    return connector.update({
      entityName: 'families',
      data: {
        name: familyUpdatedTestName,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      filter: {
        id: {
          _eq: createdId
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
        expect(typedResult[0].name).toBe(familyUpdatedTestName)
        return done()
      }
    )
  })

  it('If the filter matchs 0 items, return an empty array', (done) => {
    createdId += 1
    return connector.update({
      entityName: 'families',
      data: {
        id: createdId,
      },
      filter: {
        id: {
          _eq: createdId - 1
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

  it('Should not update a family because of no match', (done) => {
    return connector.update({
      entityName: 'families',
      data: {
        name: familyUpdatedTestName,
        createdAt: new Date(),
        updatedAt: new Date(),
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

  it('Should delete a family', (done) => {
    return connector.remove({
      entityName: 'families',
      filter: {
        id: {
          _eq: createdId
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

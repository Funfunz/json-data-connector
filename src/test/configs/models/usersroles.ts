export default {
  'name': 'usersroles',
  'connector': 'mainDatabase',
  'visible': true,
  'roles': {
    'create': [
      'all'
    ],
    'read': [
      'all'
    ],
    'update': [
      'all'
    ],
    'delete': [
      'all'
    ]
  },
  'properties': [
    {
      'name': 'userId',
      'searchable': true,
      'visible': {
        'list': true,
        'detail': true,
        'relation': true
      },
      'model': {
        'type': 'int',
        'allowNull': false,
        'isPk': true
      },
      'layout': {
        'label': 'UserId',
        'listColumn': {},
        'editField': {
          'type': 'number'
        }
      }
    },
    {
      'name': 'roleId',
      'searchable': true,
      'visible': {
        'list': true,
        'detail': true,
        'relation': true
      },
      'model': {
        'type': 'int',
        'allowNull': false,
        'isPk': true
      },
      'layout': {
        'label': 'RoleId',
        'listColumn': {},
        'editField': {
          'type': 'number'
        }
      }
    }
  ],
  'layout': {
    'label': 'Usersroles',
    'listPage': {},
    'searchField': {},
    'createButton': {},
    'editButton': {},
    'deleteButton': {},
    'editPage': {
      'sections': []
    }
  },
  'relations': [
    {
      'type': 'n:1',
      'relationalTable': 'usersroles',
      'foreignKey': 'userId',
      'remoteTable': 'users'
    },
    {
      'type': 'n:1',
      'relationalTable': 'usersroles',
      'foreignKey': 'roleId',
      'remoteTable': 'roles'
    }
  ]
}
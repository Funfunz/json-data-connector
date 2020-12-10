export default {
  'name': 'users',
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
  'relations': [
    {
      'type': 'm:n',
      'relationalTable': 'usersroles',
      'foreignKey': 'userId',
      'remoteTable': 'roles',
      'remoteForeignKey': 'roleId',
    },
    {
      'type': '1:n',
      'relationalTable': 'products',
      'foreignKey': 'id',
      'remoteForeignKey': 'userId',
      'remoteTable': 'products',
    }
  ],
  'properties': [
    {
      'name': 'id',
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
        'label': 'Id',
        'listColumn': {},
        'editField': {
          'type': 'number'
        }
      }
    },
    {
      'name': 'email',
      'searchable': true,
      'visible': {
        'list': true,
        'detail': true,
        'relation': false
      },
      'model': {
        'type': 'varchar(255)',
        'allowNull': false
      },
      'layout': {
        'label': 'Email',
        'listColumn': {},
        'editField': {
          'type': 'text'
        }
      }
    },
    {
      'name': 'name',
      'searchable': true,
      'visible': {
        'list': true,
        'detail': true,
        'relation': false
      },
      'model': {
        'type': 'varchar(255)',
        'allowNull': true
      },
      'layout': {
        'label': 'Name',
        'listColumn': {},
        'editField': {
          'type': 'text'
        }
      }
    },
    {
      'name': 'password',
      'searchable': true,
      'visible': {
        'list': true,
        'detail': true,
        'relation': false
      },
      'model': {
        'type': 'varchar(255)',
        'allowNull': true
      },
      'layout': {
        'label': 'Password',
        'listColumn': {},
        'editField': {
          'type': 'text'
        }
      }
    },
  ],
  'layout': {
    'label': 'Users',
    'listPage': {},
    'searchField': {},
    'createButton': {},
    'editButton': {},
    'deleteButton': {},
    'editPage': {
      'sections': []
    }
  }
}
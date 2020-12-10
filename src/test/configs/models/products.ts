export default {
  'name': 'products',
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
      'name': 'color',
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
        'label': 'Color',
        'listColumn': {},
        'editField': {
          'type': 'text'
        }
      }
    },
    {
      'name': 'userId',
      'searchable': true,
      'visible': {
        'list': true,
        'detail': true,
        'relation': false
      },
      'model': {
        'type': 'int',
        'allowNull': true
      },
      'layout': {
        'label': 'UserId',
        'listColumn': {},
        'editField': {
          'type': 'number'
        }
      }
    }
  ],
  'layout': {
    'label': 'Products',
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
      'relationalTable': 'products',
      'foreignKey': 'userId',
      'remoteTable': 'users',
    }
  ]
}
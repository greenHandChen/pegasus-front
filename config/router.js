module.exports = [
  {
    path: '/activiti',
    models: [
      'activiti/activiti'
    ],
    components: [
      {
        path: '/activiti/definiteProcess',
        models: [
          'activiti/activiti'
        ],
        component: 'activiti/ProcessDefinition'
      },
      {
        path: '/activiti/startProcess',
        models: [
          'activiti/activiti'
        ],
        // TODO
        component: 'activiti/Demo'
      }
    ]
  }
]
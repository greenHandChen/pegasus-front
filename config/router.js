module.exports = [
  /** 工作流路由 start */
  {
    path: '/activiti/processDefinition',
    models: [
      'activiti/processDefinition'
    ],
    component: 'activiti/ProcessDefinition'
  },
  {
    path: '/activiti/processTest',
    models: [
      'activiti/processTest'
    ],
    component: 'activiti/ProcessTest'
  },
  {
    path: '/activiti/processTodoTask',
    models: [
      // TODO
      'activiti/processTodoTask'
    ],
    component: 'activiti/ProcessTodoTask'
  },
  {
    path: '/activiti/todoTask',
    models: [
      // TODO
      'activiti/processDefinition'
    ],
    component: 'activiti/TodoTask'
  },
  /** 工作流路由 end */
  {
    path: '/platform/menuTree',
    models: [
      // TODO
      'activiti/processDefinition'
    ],
    component: 'platform/Menu'
  }
]
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
  /** 平台功能路由 start */
  {
    path: '/platform/menuTree',
    models: [
      'platform/menu'
    ],
    component: 'platform/Menu'
  },
  {
    path: '/platform/roleManagement',
    models: [
      'platform/role'
    ],
    component: 'platform/RoleManagement'
  }
  /** 平台功能路由 end */

]
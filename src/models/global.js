import ProcessDefinition from "../routes/activiti/ProcessDefinition";
import Demo2 from "../components/Demo2";

export default {
  namespace: 'global',

  state: {
    menuTree: [],// 左侧菜单栏
    tabPane: [],// 已有的tab页
    activeKey: null// 当前激活的tab页的key
  },

  effects: {
    * initMenu({payload}, {call, put}) {
      yield put({
        type: 'updateState',
        payload: {
          menuTree: [
            {
              isLeaf: false,
              path: '/activiti',
              name: '流程管理',
              leftClass: 'fa fa-dashboard',
              menuTree: [
                {
                  isLeaf: true,
                  path: '/activiti/definiteProcess',
                  name: '流程设计',
                  component: ProcessDefinition,
                  leftClass: 'fa fa-circle-o'
                },
                {
                  isLeaf: true,
                  path: '/activiti/startProcess',
                  name: '流程测试',
                  component: Demo2,
                  leftClass: 'fa fa-circle-o'
                }
              ]
            }, {
              isLeaf: false,
              path: '/layout',
              name: '布局测试',
              leftClass: 'fa fa-files-o',
              menuTree: [
                {
                  isLeaf: true,
                  path: '/layout/1',
                  name: '布局测试1',
                  leftClass: 'fa fa-circle-o'
                },
                {
                  isLeaf: true,
                  path: '/layout/2',
                  name: '布局测试2',
                  leftClass: 'fa fa-circle-o'
                }
              ]
            }, {
              isLeaf: false,
              path: '/multiMenu',
              name: '多级菜单',
              leftClass: 'fa fa-share',
              menuTree: [
                {
                  isLeaf: true,
                  path: '/multiMenu/1',
                  name: '多级菜单-One',
                  leftClass: 'fa fa-circle-o'
                }, {
                  isLeaf: false,
                  path: '/multiMenu/1',
                  name: '多级菜单-One',
                  leftClass: 'fa fa-circle-o',
                  menuTree: [
                    {
                      isLeaf: true,
                      path: '/multiMenu/2',
                      name: '多级菜单-Two',
                      leftClass: 'fa fa-circle-o'
                    }, {
                      isLeaf: false,
                      path: '/multiMenu/2',
                      name: '多级菜单-Two',
                      leftClass: 'fa fa-circle-o',
                      menuTree: [
                        {
                          isLeaf: true,
                          path: '/multiMenu/3',
                          name: '多级菜单-Three',
                          leftClass: 'fa fa-circle-o'
                        }
                      ]
                    }
                  ]
                },
                {
                  isLeaf: true,
                  path: '/multiMenu/1',
                  name: '多级菜单-One',
                  leftClass: 'fa fa-circle-o'
                }
              ]
            }
          ]
        }
      });
    }
  },

  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
    addTabPane(state, {payload}) {
      const {menu} = payload;
      const {tabPane} = state;
      return {
        ...state,
        tabPane: [...tabPane, menu],
        activeKey: menu.path
      }
    }
  }
}
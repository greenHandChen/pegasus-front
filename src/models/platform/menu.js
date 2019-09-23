import {findMenuAll} from '../../services/authorize/menuService'

export default {
  namespace: 'menu',

  state: {
    menuTree: []
  },

  effects: {
    * findMenuAll({payload}, {call, put}) {
      const menuTree = yield call(findMenuAll);
      if (menuTree) {
        yield put({
          type: 'updateState',
          payload: {
            menuTree
          }
        });
      }
      return menuTree;
    }
  },

  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload
      };
    }
  }
}
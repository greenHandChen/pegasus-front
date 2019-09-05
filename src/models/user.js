import {getCurrentUser} from '../services/platform/userService'

export default {
  namespace: 'user',

  state: {
    currentUser: {}
  },

  effects: {
    * getCurrentUser({payload}, {call, put}) {
      const currentUser = yield call(getCurrentUser);
      if (currentUser) {
        yield put({
          type: 'updateState',
          payload: {
            currentUser
          }
        });
      }
    }
  },

  reducers: {
    updateState(state, action) {
      console.log(state)
      console.log(action.payload)
      return {
        ...state,
        ...action.payload
      };
    }
  }
}
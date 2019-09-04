import {getAccessToken} from '../services/authorize/authorizeService';

export default {
  namespace: 'login',

  state: {},

  effects: {
    * getAccessToken({payload}, {call, put}) {
      return yield call(getAccessToken, payload);
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
import {
  createOrUpdateAccount,
  dispatchRole,
  findAccountAll,
  findAccountByUserId,
  findRoleListByUserId
} from '../../services/platform/accountService';

export default {
  namespace: 'account',

  state: {
    accountList: [],
    userRoleList: []
  },

  effects: {
    * findAccountAll({payload}, {call, put}) {
      const accountList = yield call(findAccountAll, payload);
      if (accountList) {
        yield put({
          type: 'updateState',
          payload: {accountList}
        });
      }
      return accountList;
    },
    * createOrUpdateAccount({payload}, {call, put}) {
      yield call(createOrUpdateAccount, payload);
      yield put({
        type: 'findAccountAll'
      });
    },
    * findAccountByUserId({payload}, {call, put}) {
      return yield call(findAccountByUserId, payload);
    },
    * findRoleListByUserId({payload}, {call, put}) {
      const userRoleList = yield call(findRoleListByUserId, payload);
      if (userRoleList) {
        yield put({
          type: 'updateState',
          payload: {
            userRoleList: userRoleList
          }
        });
      }
      return userRoleList;
    },
    * dispatchRole({payload}, {call, put}) {
      const userRoleList = yield call(dispatchRole, payload);
      if (userRoleList) {
        yield put({
          type: 'findRoleListByUserId',
          payload: {
            userId: payload.userId
          }
        });
      }
      return userRoleList;
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
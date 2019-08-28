import {getProcessDefinitionList} from '../../services/activiti/processDefinitionService';

export default {
  namespace: 'activiti',

  state: {
    processDefinitionList: []
  },

  effects: {
    * getProcessDefinitionList({payload}, {call, put}) {
      const res = yield call(getProcessDefinitionList);
      console.log(res);
      if (res) {
        yield put({
          type: 'updateState',
          payload: {
            processDefinitionList: res
          }
        });
      }
    }
  },

  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
}
import {
  getProcessDefinitionList,
  createProcessDefinition
} from '../../services/activiti/processDefinitionService';

export default {
  namespace: 'activiti',

  state: {
    processDefinitionList: []
  },

  effects: {
    * getProcessDefinitionList({payload}, {call, put}) {
      const res = yield call(getProcessDefinitionList);
      if (res) {
        yield put({
          type: 'updateState',
          payload: {
            processDefinitionList: res
          }
        });
      }
    },
    * createProcessDefinition({payload}, {call, put}) {
      return yield call(createProcessDefinition);
    }
  },

  reducers: {
    updateState(state, action) {
      console.log(action.payload);
      return {
        ...state,
        ...action.payload
      }
    }
  }

}
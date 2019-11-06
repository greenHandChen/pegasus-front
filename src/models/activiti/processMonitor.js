import {
  deliverTask,
  findDeliverTask,
  findProcessInstanceMonitor,
  findProcessJumpNode,
  finishTask,
  jumpTask,
  suspendOrActiveTask
} from '../../services/activiti/processMonitorService';
import {response} from "../../utils/response";

export default {
  namespace: 'processMonitor',

  state: {
    deliverTaskList: [],
    processNodeList: [],
    processMonitorList: []
  },

  effects: {
    * findProcessInstanceMonitor({payload}, {call, put}) {
      const processMonitorList = yield call(findProcessInstanceMonitor, payload);
      if (processMonitorList) {
        yield put({
          type: 'updateState',
          payload: {
            processMonitorList
          }
        });
      }
      return processMonitorList;
    },
    * findProcessJumpNode({payload}, {call, put}) {
      const processNodeList = yield call(findProcessJumpNode, payload);
      if (processNodeList) {
        yield put({
          type: 'updateState',
          payload: {
            processNodeList
          }
        });
      }
      return processNodeList;
    },
    * findDeliverTask({payload}, {call, put}) {
      const deliverTaskList = yield call(findDeliverTask, payload);
      if (deliverTaskList) {
        yield put({
          type: 'updateState',
          payload: {
            deliverTaskList
          }
        });
      }
      return deliverTaskList;
    },
    * jumpTask({payload}, {call, put}) {
      response(yield call(jumpTask, payload));
      yield put({type: 'findProcessInstanceMonitor'});
    },
    * finishTask({payload}, {call, put}) {
      response(yield call(finishTask, payload));
      yield put({type: 'findProcessInstanceMonitor'});
    },
    * suspendOrActiveTask({payload}, {call, put}) {
      response(yield call(suspendOrActiveTask, payload));
      yield put({type: 'findProcessInstanceMonitor'});
    },
    * deliverTask({payload}, {call, put}) {
      response(yield call(deliverTask, payload));
      yield put({
        type: 'findDeliverTask',
        payload: {
          processInstanceId: payload.processInstanceId
        }
      });
      yield put({type: 'findProcessInstanceMonitor'});
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
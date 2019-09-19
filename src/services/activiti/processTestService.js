import {request} from "../../utils/request";

/**
 * @Author: enHui.Chen
 * @Description: 获取流程模版
 * @Data 2019/8/28
 */
export async function getProcessTemplateList(params) {
  return request(`/v1/activiti/repository/process-definitions`, {
    method: 'GET',
    query: params
  });
}

/**
 * @Author: enHui.Chen
 * @Description: 获取流程测试人员
 * @Data 2019/8/28
 */
export async function getProcessTestEmployeeList(params) {
  return request(`/v1/activiti/find/processTest/employee`, {
    method: 'GET',
    query: params
  });
}

/**
 * @Author: enHui.Chen
 * @Description: 发起测试流程
 * @Data 2019/8/28
 */
export async function startProcessTest(params) {
  return request(`/v1/activiti/start/processTest`, {
    method: 'POST',
    query: params
  });
}
import {request} from "../../utils/config";

/**
 * @Author: enHui.Chen
 * @Description: 流程设计
 * @Data 2019/8/28
 */
export async function getProcessDefinitionList() {
  return request('/activiti/find/processDefinition', {
    method: 'GET'
  });
}

/**
 * @Author: enHui.Chen
 * @Description: 创建流程
 * @Data 2019/8/28
 */
export async function createProcessDefinition() {
  return request('/activiti/create/processDefinition', {
    method: 'POST'
  });
}
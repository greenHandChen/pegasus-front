import {request} from "../../utils/request";

/**
 * @Author: enHui.Chen
 * @Description: 获取流程
 * @Data 2019/8/28
 */
export async function getProcessDefinitionList(params) {
  return request(`/activiti/find/processDefinition`, {
    method: 'GET',
    query: params
  });
}

/**
 * @Author: enHui.Chen
 * @Description: 创建流程
 * @Data 2019/8/28
 */
export async function createProcessDefinition(params) {
  return request(`/activiti/create/processDefinition`, {
    method: 'POST',
    body: params
  });
}

/**
 * @Author: enHui.Chen
 * @Description: 删除流程
 * @Data 2019/8/28
 */
export async function deleteProcessDefinition(params) {
  return request(`/activiti/delete/processDefinition/${params.modelId}`, {
    method: 'DELETE',
    responseType: 'text'
  });
}

/**
 * @Author: enHui.Chen
 * @Description: 部署流程
 * @Data 2019/8/28
 */
export async function deployProcessDefinition(params) {
  return request(`/activiti/deploy/processDefinition/${params.modelId}`, {
    method: 'POST',
    responseType: 'text'
  });
}
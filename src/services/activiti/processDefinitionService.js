import {request} from "../../utils/config";

/**
 * @Author: enHui.Chen
 * @Description: 流程设计
 * @Data 2019/8/28
 */
export async function getProcessDefinitionList() {
  return request('/modelList', {
    method: 'GET'
  });
}
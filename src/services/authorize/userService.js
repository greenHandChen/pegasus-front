/**
 * @Author: enHui.Chen
 * @Description: 获取当前用户信息
 * @Data 2019/8/30
 */
import {request} from "../../utils/request";

export async function getCurrentUser(params) {
  return request("/v1/user/self", {
    method: 'GET'
  })
}
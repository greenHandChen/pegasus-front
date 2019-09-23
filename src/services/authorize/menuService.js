/**
 * @Author: enHui.Chen
 * @Description: 初始化菜单-test
 * @Data 2019/8/30
 */
import {request} from "../../utils/request";

export async function findMenuAll(params) {
  return request("/v1/menu/findMenuAll", {
    method: 'GET'
  })
}

export async function initMenuByRoleId(params) {
  return request("/v1/menu/initMenuByRoleId?roleId=1", {
    method: 'GET',
    query: params
  })
}
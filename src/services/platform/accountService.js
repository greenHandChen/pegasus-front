import {request} from "../../utils/request";

/**
 * @Author: enHui.Chen
 * @Description: 初始化帐号列表
 * @Data 2019/9/27
 */
export async function findAccountAll(params) {
  return request("/v1/user/findAccountAll", {
    method: 'GET'
  })
}

/**
 * @Author: enHui.Chen
 * @Description: 创建/编辑帐号
 * @Data 2019/9/27
 */
export async function createOrUpdateAccount(params) {
  return request("/v1/user/createOrUpdateAccount", {
    method: 'POST',
    body: params
  })
}

/**
 * @Author: enHui.Chen
 * @Description: 根据UserId查找帐号信息
 * @Data 2019/9/27
 */
export async function findAccountByUserId(params) {
  return request("/v1/user/findAccountByUserId", {
    method: 'GET',
    query: params
  })
}

/**
 * @Author: enHui.Chen
 * @Description: 根据UserId查找帐号信息
 * @Data 2019/9/27
 */
export async function findRoleListByUserId(params) {
  return request("/v1/role/findRoleListByUserId", {
    method: 'GET',
    query: params
  })
}

/**
 * @Author: enHui.Chen
 * @Description: 帐号角色分配
 * @Data 2019/9/27
 */
export async function dispatchRole(params) {
  return request(`/v1/user/dispatchRole/${params.userId}`, {
    method: 'POST',
    body: params.roleIds
  })
}
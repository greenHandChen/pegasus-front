/**
 * @Author: enHui.Chen
 * @Description: 初始化菜单-test
 * @Data 2019/8/30
 */
import {request} from "../../utils/request";

export async function initMenu(params) {
  return request("/v1/menu/findAll", {
    method: 'GET'
  })
}
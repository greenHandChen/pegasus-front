import {request} from "../../utils/request";

/**
 * @Author: enHui.Chen
 * @Description: 根据员工姓名模糊搜索员工信息
 * @Data 2019/9/27
 */
export async function lovQuery(params) {
  return request(`/v1/common/lov/query/${params.code}`, {
    method: 'GET',
    query: {
      page: params.page,
      size: params.size,
      init: params.init
    }
  })
}
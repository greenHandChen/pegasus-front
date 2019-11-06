import {request} from "../../utils/request";

/**
 * @Author: enHui.Chen
 * @Description: 根据员工姓名模糊搜索员工信息
 * @Data 2019/9/27
 */
export async function findEmployeeByName(params) {
  return request(`/v1/employee/find/employeeByName/${params.value}`, {
    method: 'GET'
  })
}
/**
 * @Author: enHui.Chen
 * @Description: 全局配置
 * @Data 2019/8/28
 */
export const API_HOST = 'http://localhost:8079';

/**
 * @Author: enHui.Chen
 * @Description: 授权登录相关(简化模式)
 * @Data 2019/9/4
 */
export const CLIENT_ID = 'localhostCode';
export const CLIENT_SECRET = '123456';
export const ACCESS_TOKEN = 'access_token';


export const AUTH_LOGOUT_URL = `${API_HOST}/logout`;
export const AUTH_URL = `${API_HOST}/oauth/authorize?response_type=token&client_id=${CLIENT_ID}`;
export const ACCESS_TOKEN_URL = `${API_HOST}/oauth/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code`;
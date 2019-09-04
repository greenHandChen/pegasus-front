/**
 * @Author: enHui.Chen
 * @Description: 根据code授权码获取access_token
 * @Data 2019/9/4
 */
export async function getAccessToken(code) {
  await window.dvaApp._store.dispatch({
    type: 'login/getAccessToken',
    payload: {code}
  });
}
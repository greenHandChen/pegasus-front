import fetch from 'dva/fetch';

/**
 * @Author: enHui.Chen
 * @Description: 全局配置
 * @Data 2019/8/28
 */
const API_HOST = 'http://localhost:8079';
const API_VERSION_1 = '/v1';

const DEFAULT_OPTIONS = {
  credentials: 'include',// 同源跨域携带COOKIE
  headers: {
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
  }
}

export function request(url, options) {
  const newOptions = {...DEFAULT_OPTIONS, ...options};

  const newUrl = `${API_HOST}${API_VERSION_1}${url}`;

  if (newOptions.method === 'POST' ||
    newOptions.method === 'DELETE' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'PATCH') {
    if (newOptions.body instanceof FormData) {
      newOptions.headers = {
        ...newOptions.headers,
        Accept: 'application/json'
      }
    } else {
      newOptions.headers = {
        ...newOptions.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
  }

  return fetch(newUrl, newOptions)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
    });
}
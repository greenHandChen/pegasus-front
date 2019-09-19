import fetch from "dva/fetch";
import {ACCESS_TOKEN, API_HOST, AUTH_URL} from "../../config/config";
import {filterNullValObj, generateUrl, getStorage} from "./util";

const DEFAULT_OPTIONS = {
  credentials: 'include',// 同源跨域携带COOKIE
  headers: {
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
  }
}

export function request(url, options) {
  let newOptions = {...DEFAULT_OPTIONS, ...options};

  let newUrl = `${API_HOST}${url}`;

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
      newOptions.body = JSON.stringify(newOptions.body);
      newOptions.headers = {
        ...newOptions.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
  }

  // 拼接URL参数
  if (newOptions.query) {
    newUrl = generateUrl(newUrl, filterNullValObj(newOptions.query));
  }

  const accessToken = getStorage(ACCESS_TOKEN);

  if (accessToken) {
    newOptions.headers = {
      ...newOptions.headers,
      Authorization: `bearer ${accessToken}`
    }
  }

  return fetch(newUrl, newOptions)
    .then(res => {
      if (res.status === 401) {
        window.open(AUTH_URL, '_self');
      }

      // no-content
      if (res.status === 204) {
        return {};
      }

      if (res.status >= 200 && res.status < 300) {
        return newOptions.responseType === 'text' ? res.text : res.json();
      }

    });
}
import fetch from "dva/fetch";
import {API_HOST, API_VERSION_1} from "../../config/config";
import {filterNullValObj, generateUrl} from "./util";

const DEFAULT_OPTIONS = {
  credentials: 'include',// 同源跨域携带COOKIE
  headers: {
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
  }
}

export function request(url, options) {
  const newOptions = {...DEFAULT_OPTIONS, ...options};

  let newUrl = `${API_HOST}${API_VERSION_1}${url}`;

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

  return fetch(newUrl, newOptions)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return newOptions.responseType === 'text' ? res.text : res.json();
      }
    });
}
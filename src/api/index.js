import axios from 'axios';
import qs from 'qs';
import { Loading, Message } from 'element-ui';
import store from '@/store';
import router from "@/router"
import * as g from 'youyun-vue-components/global';
var _isShowMessage = true;

function setTimeShowMessage () {
  _isShowMessage = false;
  setTimeout(() => {
    _isShowMessage = true;
  }, 5000)
}

axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
axios.defaults.headers["Content-Type"] = "application/json"

// 添加一个请求拦截器
axios.interceptors.request.use((config) => {
  // 设置全局参数
  config.headers.common.client = 'WEB';
  config.headers.common.accessToken = store.state.admin.accessToken || ''
  // 参数格式为form data(默认request payload)
  for (const field in config.data) {
    if (g.utils.isNull(config.data[field]) || g.utils.isUndefined(config.data[field])) {
      delete config.data[field];
    }
  }
  if (config.method === 'post' && config.needFormData) {
    config.data = qs.stringify(config.data);
  }
  if (JSON.stringify(config.data) === "{}" && config.headers['Content-Type'] !== 'multipart/form-data' && !config.headers['Data-Can-Empty']) {
    config.data = null;
  }
  if (!config.noLoading) {
    config.loading = Loading.service({text: '载入中', target: document.querySelector(".main-container"), customClass: 'g-api-loading'})
    setTimeout(() => {
      config.loading.close();
    }, config.timeout)
  }
  return config;
}, (error) => {
  // Do something with request error
  Promise.reject(error);
})

// 添加一个响应拦截器
axios.interceptors.response.use((response) => {
  if (!response.config.noLoading) {
    response.config.loading.close();
  }
  if (response.config.responseType === 'blob') {
    return response;
  }
  if (response.headers['content-type'] === 'application/octet-stream') {
    return response;
  }
  if (response.config.headers['no-interceptors']) {
    return response;
  }
  if (response.data && response.data.status === 0) {
    return response;
  } else if (response.data && response.data.status === 1 && response.data.code === -1) { // 口令过期
    const roleId = store.state.admin.roleId;
    if (_isShowMessage) {
      Message({
        message: response.data.message || "登录失效，请重新登录",
        duration: 1500,
        type: 'error'
      })
    }
    setTimeShowMessage();
    store.dispatch('resetState');
    if (roleId === 2) {
      router.replace(`/LoginStore`);
    } else {
      router.replace('/Login');
    }
    return Promise.reject(response.data);
  } else {
    if (_isShowMessage) {
      Message({
        message: response.data.message || "出现错误，请稍后再试",
        duration: 1500,
        type: 'error'
      })
    }
    return Promise.reject(response.data);
  }
}, (error) => {
  // Do something with response error
  try {
    error.response.config.loading.close();
  } catch (e) {
    console.error(e)
  }
  if (error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '请求错误';
        break;

      case 401:
        const roleId = store.state.admin.roleId;
        error.message = '未授权，请登录';
        store.dispatch('resetState');
        if (roleId === 2) {
          router.replace(`/LoginStore`);
        } else {
          router.replace('/Login');
        }
        break;

      case 403:
        error.message = '拒绝访问';
        break;

      case 404:
        error.message = `请求地址出错: ${error.response.config.url}`;
        break;

      case 408:
        error.message = '请求超时';
        break;

      case 500:
        error.message = error.response.data.message || '服务器内部错误';
        break;

      case 501:
        error.message = '服务未实现';
        break;

      case 502:
        error.message = '网关错误';
        break;

      case 503:
        error.message = '服务不可用';
        break;

      case 504:
        error.message = '网关超时';
        break;

      case 505:
        error.message = 'HTTP版本不受支持';
        break;
      default:
        error.message = `连接出错(${error.response.status})!`;
    }
  } else {
    error.message = '网络异常,连接服务器失败!';
  }
  if (_isShowMessage) {
    Message({
      message: error.message || "出现错误，请稍后再试",
      duration: 1500,
      type: 'error'
    })
  }
  if (error.response.status === 401) {
    setTimeShowMessage();
  }
  return Promise.reject(error);
});

// 通用方法
export const POST = (url, params = {}, config = {}) => axios.post(url, params, config).then((res) => res.data);

export const GET = (url, params = {}, config = {}) => axios.get(url, Object.assign({
  params: params
}, config)).then((res) => res.data);

export const GETJSON = (url) => axios.get(url, {
  headers: {
    'no-interceptors': true
  }
}).then((res) => res.data)

export const ALL = (promiseArr) => axios.all(promiseArr);

import axios from 'axios';
import qs from 'qs';
import { Loading, Message } from 'element-ui';
import store from '@/store';
import router from "@/router"
// import Vue from 'vue';
// import web_config from 'libs/config/config';
import * as g from '../libs/global';

// const _this = new Vue();
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? web_config.devServer : web_config.server;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.baseURL = g.config.server;

axios.defaults.timeout = g.config.timeout;
axios.defaults.withCredentials = true;

// 添加一个请求拦截器
axios.interceptors.request.use((config) => {
  // 设置全局参数
  config.timeout = 10000;
  config.headers.common.userToken = localStorage.getItem('token-merchant') || '';
  config.headers.common.client = 'WEB';
  config.headers.common.Access_token = localStorage.getItem('accessToken') || ''
  // console.log(config);
  // 参数格式为form data(默认request payload)

  for (const field in config.data) {
    if (g.utils.isNull(config.data[field]) || g.utils.isUndefined(config.data[field])) {
      config.data[field] = '';
    }
  }
  if (config.method === 'post' && config.needFormData) {
    config.data.merchantNo = localStorage.getItem('userInfo-merchant') ? JSON.parse(localStorage.getItem('userInfo-merchant')).merchantNo : '';
    config.data = qs.stringify(config.data);
  } else if (config.method === 'post' && Object.keys(config.data).length === 1) {
    if (!config.changeContent) {
      config.data = qs.stringify(config.data);
    }
  } else if (config.method === 'get') {
    // config.params.merchantNo = localStorage.getItem('userInfo-merchant') ? JSON.parse(localStorage.getItem('userInfo-figmerchant')).merchantNo : '';
  }
  if (JSON.stringify(config.data) === "{}") {
    config.data = null;
  }
  Loading.service({text: '载入中', body: true})
  return config;
}, (error) => {
  // Do something with request error
  Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use((response) => {
  Loading.service().close();
  if (response.data && response.data.status === 0) {
    return response;
  } else {
    Message({
      message: response.data.errorMessage || "出现错误，请稍后再试",
      duration: 1500,
      type: 'error'
    })
    return Promise.reject(response.data);
  }
}, (error) => {
  // Do something with response error
  Loading.service().close();
  if (error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '请求错误';
        break;

      case 401:
        error.message = '未授权，请登录';
        store.dispatch('saveAccessToken', null);
        router.replace('/login');
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
        error.message = error.response.errorMessage || '服务器内部错误';
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
  Message({
    message: error.message || "出现错误，请稍后再试",
    duration: 1500,
    type: 'error'
  })
  return Promise.reject(error);
});

// 通用方法
export const POST = (url, params = {}, config = {}) => axios.post(url, params, config).then((res) => res.data);

export const GET = (url, params = {}) => axios.get(url, {
  params: params
}).then((res) => res.data);

export const ALL = (promiseArr) => axios.all(promiseArr);

import axios from 'axios';
import qs from 'qs';
// import Vue from 'vue';
// import web_config from 'libs/config/config';
import * as g from '../libs/global';

// const _this = new Vue();
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? web_config.devServer : web_config.server;
axios.defaults.baseURL = g.config.server;

axios.defaults.timeout = g.config.timeout;
axios.defaults.withCredentials = true;

// 添加一个请求拦截器
axios.interceptors.request.use((config) => {
  // 设置全局参数
  config.headers.common.userToken = localStorage.getItem('token-merchant') || '';
  config.headers.common.client = 'WEB';

  // 参数格式为form data(默认request payload)
  if (config.method === 'post' && config.needFormData) {
    config.data.merchantNo = localStorage.getItem('userInfo-merchant') ? JSON.parse(localStorage.getItem('userInfo-merchant')).merchantNo : '';
    config.data = qs.stringify(config.data);
  } else if (config.method === 'get') {
    // config.params.merchantNo = localStorage.getItem('userInfo-merchant') ? JSON.parse(localStorage.getItem('userInfo-merchant')).merchantNo : '';
  }
  return config;
}, (error) => {
  // Do something with request error
  Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use((response) => {
  // if (response.data && response.data.status === 'success') {
  //   return response;
  // } else {
  //   if (response.config.url.indexOf('check_login') === -1 && response.data.code === 'UNIDENTIFY') {
  //     window.reload();
  //   }
  //   _this.$message.error(response.data.message);
  //   return Promise.reject(response.data);
  // }

  if (response.data) {
    return response;
  }
}, (error) => {
  // Do something with response error
  if (error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '请求错误';
        break;

      case 401:
        error.message = '未授权，请登录';
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
        error.message = '服务器内部错误';
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
  return Promise.reject(error);
});

// 通用方法
export const POST = (url, params, config = {}) => axios.post(url, params, config).then((res) => res.data);

export const GET = (url, params) => axios.get(url, {
  params: params
}).then((res) => res.data);

export const ALL = (promiseArr) => axios.all(promiseArr);

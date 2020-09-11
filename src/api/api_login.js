import * as API from '.'

export default {
  // login: (params) => API.POST('/operation/v1/login/in', params),
  login: (params) => API.POST('/common/v1/user/login', params),
  getWebSocket: (params) => API.GET('https://www.intranet.aduer.com/ws', params),
  getSmsCode: (params) => API.GET('/common/v1/user/sendRegisterCode', params),
  changePassword: (params) => API.POST('/common/v1/user/updatePassword', params),
  forgetPassword: (params) => API.POST('/operation/v1/login/forgetPassword', params),
  bindWeChat: (params) => API.POST('/operation/v1/login/bindWeChat', params),
  out: (params) => API.POST('/common/v1/user/logout', params),
  perfectUpdate: (params) => API.POST('/operation/v1/employee/perfectUpdate', params),
  queryUserVueRouterList: (params) => API.GET('/operation/v1/systemMenu/queryUserVueRouterList', params), // 获取用户前端路由模板
  // 顶级服务商注册
  registerTopAgent: (params, config) => API.POST('/operation/v1/topAgent/register', params),
  // 发送忘记密码的验证码
  sendForgetCode: (params) => API.GET('/common/v1/user/sendForgetPasswordCode', params)
};

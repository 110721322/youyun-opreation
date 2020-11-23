import * as API from '.'

export default {
  login: (params) => API.POST('/common/v1/user/login', params),
  getSmsCode: (params) => API.GET('/common/v1/user/sendRegisterCode', params),
  changePassword: (params) => API.POST('/common/v1/user/updatePassword', params),
  out: (params) => API.POST('/common/v1/user/logout', params),
  perfectUpdate: (params) => API.POST('/operation/v1/employee/perfectUpdate', params),
  queryUserVueRouterList: (params) => API.GET('/operation/v1/systemMenu/queryUserVueRouterList', params), // 获取用户前端路由模板
  registerTopAgent: (params, config) => API.POST('/operation/v1/topAgent/register', params), // 顶级服务商注册
  sendForgetCode: (params) => API.GET('/common/v1/user/sendForgetPasswordCode', params), // 发送忘记密码的验证码
  loginWithTicket: (params) => API.GET('/common/v1/user/loginWithTicket', params), // 跨平台登录
  updatePassword: (params) => API.POST('/merchant/v1/merchantInfo/updatePassword', params) // 修改密码（登录之后在头部导航栏点击修改）
};

import * as API from '.'

export default {
  // 验证码登录或密码登录
  login: (params) => API.POST('/common/v1/user/login', params),
  // 发送验证码
  getSmsCode: (params) => API.GET('/common/v1/user/sendRegisterCode', params),
  // 修改密码
  changePassword: (params) => API.POST('/common/v1/user/updatePassword', params),
  // 退出登录
  out: (params) => API.POST('/common/v1/user/logout', params),
  // 成员管理-完善个人信息
  perfectUpdate: (params) => API.POST('/operation/v1/employee/perfectUpdate', params),
  // 获取用户前端路由模板
  queryUserVueRouterList: (params) => API.GET('/operation/v1/systemMenu/queryUserVueRouterList', params),
  // 顶级服务商注册
  registerTopAgent: (params, config) => API.POST('/operation/v1/topAgent/register', params),
  // 发送忘记密码的验证码
  sendForgetCode: (params) => API.GET('/common/v1/user/sendForgetPasswordCode', params),
  // 跨平台登录
  loginWithTicket: (params) => API.GET('/common/v1/user/loginWithTicket', params),
  // 修改密码（登录之后在头部导航栏点击修改）
  updatePassword: (params) => API.POST('/merchant/v1/merchantInfo/updatePassword', params)
};

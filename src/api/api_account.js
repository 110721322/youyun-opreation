import * as API from '.';
export default {
  // 账户中心
  getLoginUser: (params) => API.GET('/operation/v1/login/getLoginUser', params),
  // 账户中心-发送短信验证码
  sendForgetPasswordCode: (params) => API.GET('/common/v1/user/sendForgetPasswordCode', params),
  // 账户中心-修改密码
  updatePassword: (params) => API.POST('/common/v1/user/updatePassword', params)
}

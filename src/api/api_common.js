import * as API from '.';

export default {
  // 获取短信验证码
  getSmsCode: (params) => API.GET('/common/v1/user/sendRegisterCode', params),
  // 发送忘记密码的验证码
  sendForgetPasswordCode: (params) => API.GET('/common/v1/user/sendForgetPasswordCode', params),
  // 修改密码
  updatePassword: (params) => API.POST('/common/v1/user/updatePassword', params)
};

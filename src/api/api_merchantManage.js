import * as API from '.';
// 1: () => API.GET(''),
const api = {
  // 商户列表
  merchantList: (params) => API.GET('/operation/v1/merchantNew/selectPageByCondition', params),
  // 查询商户详情
  getDetailByMerchantNo: (params) => API.GET('/operation/v1/merchantNew/getDetailByMerchantNo', params),
  // 发送商户信息修改验证码
  sendMerchantUpdateCode: (params) => API.GET('/operation/v1/merchantNew/sendMerchantUpdateCode', params),
  // 修改商户名称和手机号
  updateMerchantInfo: (params) => API.POST('/operation/v1/merchantNew/updateMerchantInfo', params),
  // 商户启用/禁用
  disabeldMerchant: (params) => API.POST('/operation/v1/merchantNew/disabeldMerchant', params),
  // 重置密码
  resetPassword: (params) => API.POST('/operation/v1/merchantNew/resetPassword', params),
  // 商户详情下的门店列表
  shopByPage: (params) => API.GET('/operation/v1/merchantNew/shopByPage', params)
};

export default api
import * as API from '.';
// ss: (params) => API.GET('', params),
const api = {
  // 商户列表
  merchantList: (params) => API.GET('/operation/v1/merchantNew/selectPageByCondition', params),
  // 查询商户详情
  getDetailByMerchantNo: (params) => API.GET('/operation/v1/merchantNew/getDetailByMerchantNo', params),
  // 发送商户信息修改验证码
  sendMerchantUpdateCode: (params) => API.GET('/operation/v1/merchantNew/sendMerchantUpdateCode', params),
  // 修改商户名称和手机号
  updateMerchantInfo: (params) => API.POST('/operation/v1/merchantNew/updateMerchantInfo', params, {needFormData: true}),
  // 商户启用/禁用
  disabeldMerchant: (params) => API.POST('/operation/v1/merchantNew/disabeldMerchant', params, {needFormData: true}),
  // 重置密码
  resetPassword: (params) => API.POST('/operation/v1/merchantNew/resetPassword', params),
  // 商户详情下的门店列表
  shopByPage: (params) => API.GET('/operation/v1/merchantNew/shopByPage', params),
  // 按条件查询商户列表
  selectByCondition: (params) => API.GET('/operation/v1/merchantNew/selectByCondition', params),
  // 统计商户数量/活跃/异常商户
  merchantCount: () => API.GET('/operation/v1/statistic/merchant/count'),
  // 统计商户下详情信息
  merchantDetailStatic: (params) => API.GET('/operation/v1/statistic/merchant/detail/info', params),
  // 统计商户对应的门店详情信息
  sss: (params) => API.GET('/operation/v1/statistic/merchant/shop/info', params)
};

export default api
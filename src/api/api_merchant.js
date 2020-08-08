import * as API from '.';

export default {
  // 查询商户列表
  queryPageByCondition: (params) => API.GET('/operation/v1/merchant/queryPageByCondition', params),
  // 商户开通的渠道商户号信息
  queryChannelMerchantNo: (params) => API.GET('/operation/v1/merchant/queryChannelMerchantNo', params),
  // 查询商户信息
  getDetailByMerchantNo: (params) => API.GET('/operation/v1/merchant/getDetailByMerchantNo', params),
  // 查询商户渠道信息
  getChannelMerchantDetailByNo: (params) => API.GET('/operation/v1/merchant/getChannelMerchantDetailByNo', params),
  // 商户开通的支付渠道信息
  queryActiveChannel: (params) => API.GET('/operation/v1/merchant/queryActiveChannel', params),
  // 商户结算记录-根据条件查询结算汇总记录
  getSettleSummaryByCondition: (params) => API.POST('/operation/v1/merchant/getSettleSummaryByCondition', params),
  // 商户管理-基础数据
  queryInit: (params) => API.POST('/operation/v1/merchant/queryInit', params),
  // 修改商户业务信息
  saveMerchantBusinessInfo: (params) => API.POST('/operation/v1/merchant/saveMerchantBusinessInfo', params),
  // 查询商户结算列表
  queryPageMerchantSettleByCondition: (params) => API.POST('/operation/v1/merchant/queryPageMerchantSettleByCondition', params)
};

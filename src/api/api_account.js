import * as API from '.';
export default {
  // 账户中心
  getLoginUser: (params) => API.GET('/operation/v1/login/getLoginUser', params),
  // 首页头部数据
  getStatisticData: (params) => API.GET('/operation/v1/statistic/getData', params),
  // 获取日支付趋势
  getDayTendency: (params) => API.GET('/operation/v1/statistic/getDayTendency', params),
  // 获取月支付趋势
  getMonthTendency: (params) => API.GET('/operation/v1/statistic/getMonthTendency', params),
  // 支付方式占比
  getPayTypePercent: (params) => API.GET('/operation/v1/statistic/getPayTypePercent', params),
  // 异常服务商
  getAbnormalAgent: (params) => API.GET('/operation/v1/statistic/getAbnormalAgent', params),
  // 新增服务商
  getNewAgent: (params) => API.GET('/operation/v1/statistic/getNewAgent', params),
  // 活跃服务商
  getActiveAgent: (params) => API.GET('/operation/v1/statistic/getActiveAgent', params),
  // 异常服务商
  getAbnormalMerchant: (params) => API.GET('/operation/v1/statistic/getAbnormalMerchant', params),
  // 新增服务商
  getNewMerchant: (params) => API.GET('/operation/v1/statistic/getNewMerchant', params),
  // 活跃商户
  getActiveMerchant: (params) => API.GET('/operation/v1/statistic/getActiveMerchant', params),
  // 异常门店统计
  getAbnormalShop: (params) => API.GET('/operation/v1/statistic/getAbnormalShop', params),
  // 新增门店统计
  getNewShop: (params) => API.GET('/operation/v1/statistic/getNewShop', params),
  // 活跃门店统计
  getActiveShop: (params) => API.GET('/operation/v1/statistic/getActiveShop', params)
}

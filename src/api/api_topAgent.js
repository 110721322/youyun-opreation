import * as API from '.';

export default {
  // 补充资料/详情-基本资料更新
  updateBaseInfo: (params) => API.POST('/operation/v1/topAgent/updateBaseInfo', params),
  // 补充资料/详情-财务信息更新
  updateFinancial: (params) => API.POST('/operation/v1/topAgent/updateFinancial', params),
  // 补充资料/详情-邮寄地址更新
  updateAddress: (params) => API.POST('/operation/v1/topAgent/updateAddress', params),
  // 补充资料/详情-费率更新
  updateFee: (params) => API.POST('/operation/v1/topAgent/updateFee', params),
  // 顶级服务商转移运营
  updateOperationId: (params) => API.POST('/operation/v1/topAgent/updateOperationId', params),
  // 当前登录账号是否购买了小马哥代理且有效
  officialModeActive: (params) => API.GET('/operation/v1/topAgent/officialModeActive', params)
}

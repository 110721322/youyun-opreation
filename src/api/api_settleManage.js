import * as API from '.';
// 1: () => API.GET(''),
const api = {
  // 结算管理-服务商结算列表
  settleList: (params) => API.GET('/operation/v1/agentSettle/listFinanceSettle', params),
  // 结算管理-查询单个结算审核详情
  queryDetail: (params) => API.GET('/operation/v1/agentSettle/queryDetail')
};

export default api
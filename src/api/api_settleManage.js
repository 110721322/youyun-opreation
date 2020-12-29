import * as API from '.';
// ss: (params) => API.GET('', params)
const api = {
  // 结算管理-服务商结算列表
  settleList: (params) => API.GET('/operation/v1/agentSettle/listFinanceSettle', params),
  // 结算管理-查询单个结算审核详情
  queryDetail: (params) => API.GET('/operation/v1/agentSettle/queryDetail', params),
  // 结算管理-审核通过
  financeSuccess: (params) => API.POST('/operation/v1/agentSettle/financeSuccess', params),
  // 结算管理-审核驳回
  financeReject: (params) => API.POST('/operation/v1/agentSettle/financeReject', params)
};

export default api
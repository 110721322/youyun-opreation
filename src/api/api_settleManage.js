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
  financeReject: (params) => API.POST('/operation/v1/agentSettle/financeReject', params),
  // 门店结算-门店结算记录查询
  queryShopSettle: (params) => API.GET('/operation/v1/shopSettle/queryShopSettle', params),
  // 门店结算-查询汇总数据
  shopSettleTotalData: (params) => API.GET('/operation/v1/shopSettle/shopSettleTotalData', params),
  // 服务商结算-查询结算汇总数据
  queryAgentSettleStatistic: (params) => API.GET('/operation/v1/agentSettle/queryAgentSettleStatistic', params)
};

export default api
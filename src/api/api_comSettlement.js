import * as API from '.';

export default {
  // 佣金总数
  querySettleSum: () => API.GET('operation/v1/topAgentSettle/querySettleSum'),
  // 按月统计佣金结算分页查询
  queryAllSettle: (params) => API.POST('operation/v1/topAgentSettle/queryByPage', params),
  // 结算页面初始化数据
  initSettle: () => API.GET('operation/v1/topAgentSettle/initSettle'),
  // 结算提交
  submitSettle: (params) => API.POST('operation/v1/topAgentSettle/submitSettle', params),
  // 结算记录分页查询
  querySettleRecord: (params) => API.POST('operation/v1/topAgentSettle/querySettleRecordByPage', params),
  // 根据id查询佣金结算记录明细
  queryDetailsById: (params) => API.GET('operation/v1/topAgentSettle/queryDetailsById', params),
  // 交易佣金明细总数统计
  queryCommission: (params) => API.POST('operation/v1/topAgentSettle/queryCommission', params),
  // 交易佣金明细分页查询
  queryCommissionByPage: (params) => API.POST('operation/v1/topAgentSettle/queryCommissionByPage', params)
};

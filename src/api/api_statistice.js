import * as API from '.';

export default {
  // 导入商户蜻蜓活动奖励excel
  merchantinput: (params) => API.POST('/operation/v1/dragonfly/reward/merchant/input', params),
  // Excel上传
  excelTemplate: (params) => API.POST('/operation/v1/excelTemplate/upload', params),
  // 服务商蜻蜓奖励分页查询
  queryByPage: (params) => API.GET('/operation/v1/dragonfly/reward/agent/queryByPage', params),
  // 商户蜻蜓奖励明细分页查询
  merchantqueryByPage: (params) => API.GET('/operation/v1/dragonfly/reward/merchant/queryByPage', params),
  // 分润统计-服务商分润统计-按支付方式,通道统计
  selectAgentDataByPage: (params) => API.POST('/operation/v1/topAgentStatistics/selectAgentDataByPage', params, {changeContent: true}),
  // 分润统计-服务商分润统计-间连分润统计
  selectIndirectDataByPage: (params) => API.POST('/operation/v1/topAgentStatistics/selectIndirectDataByPage', params),
  // 代理商下的商户明细
  selectMerchantDataByPage: (params) => API.POST('/operation/v1/topAgentStatistics/selectMerchantDataByPage', params),
  // (服务商)财务审核列表查询
  agentListFinanceSettle: (params) => API.GET('/operation/v1/agentSettle/listFinanceSettle', params),
  // 财务审核拒绝
  financeReject: (params) => API.POST('/operation/v1/agentSettle/financeReject', params),
  // 财务审核通过
  financeSuccess: (params) => API.POST('/operation/v1/agentSettle/financeSuccess', params),
  // 运营审核列表查询
  listOperationSettle: (params) => API.GET('/operation/v1/agentSettle/listOperationSettle', params),
  // 审核通过、驳回前的查询
  queryDetail: (params) => API.POST('/operation/v1/agentSettle/queryDetail', params),
  // 运营审核拒绝
  operationReject: (params) => API.POST('/operation/v1/agentSettle/operationReject', params),
  // 运营审核通过
  operationSuccess: (params) => API.POST('/operation/v1/agentSettle/operationSuccess', params),
  // 佣金结算
  querySettleSum: (params) => API.POST('/operation/v1/topAgentSettle/querySettleSum', params),
  // 佣金结算
  SettlequeryByPage: (params) => API.POST('/operation/v1/topAgentSettle/queryByPage', params),
  // 佣金结算
  submitSettle: (params) => API.POST('/operation/v1/topAgentSettle/submitSettle', params),
  // 支付宝服务商分润奖励分页查询
  aliAgents: (params) => API.GET('/operation/v1/direct/reward/aliAgents', params),
  // 支付宝商户分润奖励明细分页查询
  aliMerchants: (params) => API.GET('/operation/v1/direct/reward/aliMerchants', params),
  // 微信服务商分润奖励分页查询
  wxAgents: (params) => API.GET('/operation/v1/direct/reward/wxAgents', params),
  // 微信商户分润奖励明细分页查询
  wxMerchants: (params) => API.GET('/operation/v1/direct/reward/wxMerchants', params),
  // 按支付方式统计分润，按通道分页统计，顶级代理商列表数据
  selectTopAgentDataByPage: (params) => API.POST('/operation/v1/topAgentStatistics/selectTopAgentDataByPage', params),
  // 顶级代理商下的商户明细
  selectTopAgentMerchantDetailByPage: (params) => API.POST('/operation/v1/topAgentStatistics/selectTopAgentMerchantDetailByPage', params),
  // 通过商户名称模糊查询商户编号
  selectByName: (params) => API.GET('/operation/v1/topAgentStatistics/selectByName', params),
  // 财务审核-对公转账审核列表
  transferListL: (params) => API.GET('/operation/v1/corporateTransfer/queryByPage', params),
  // 财务审核-对公转账审核-驳回
  rejectTransfer: (params) => API.GET('/operation/v1/corporateTransfer/reject', params),
  // 财务审核-对公转账审核-通过
  passTransfer: (params) => API.GET('/operation/v1/corporateTransfer/pass', params)
}

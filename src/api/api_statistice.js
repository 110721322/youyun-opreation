import * as API from '.';
import * as g from '../libs/global';

export default {
  // 导入商户蜻蜓活动奖励excel
  merchantinput: (params) => API.POST(g.config.server + '/operation/v1/dragonfly/reward/merchant/input', params),
  // Excel上传
  excelTemplate: (params) => API.POST(g.config.server + '/operation/v1/excelTemplate/upload', params),
  // 服务商蜻蜓奖励分页查询
  queryByPage: (params) => API.GET(g.config.server + '/operation/v1/dragonfly/reward/agent/queryByPage', params),
  // 商户蜻蜓奖励明细分页查询
  merchantqueryByPage: (params) => API.GET(g.config.server + '/operation/v1/dragonfly/reward/merchant/queryByPage', params),
  // 分润统计-服务商分润统计-按支付方式,通道统计
  selectAgentDataByPage: (params) => API.POST(g.config.server + '/operation/v1/topAgentStatistics/selectAgentDataByPage', params, {changeContent: true}),
  // 分润统计-服务商分润统计-间连分润统计
  selectIndirectDataByPage: (params) => API.POST(g.config.server + '/operation/v1/topAgentStatistics/selectIndirectDataByPage', params),
  // 代理商下的商户明细
  selectMerchantDataByPage: (params) => API.POST(g.config.server + 'operation/v1/topAgentStatistics/selectMerchantDataByPage', params),
  // 财务审核列表查询
  listFinanceSettle: (params) => API.POST(g.config.server + '/operation/v1/topAgentAudit/listFinanceSettle', params),
  // 财务审核拒绝
  financeReject: (params) => API.POST(g.config.server + '/operation/v1/agentSettle/financeReject', params),
  // 财务审核通过
  financeSuccess: (params) => API.POST(g.config.server + '/operation/v1/agentSettle/financeSuccess', params),
  // 运营审核列表查询
  listOperationSettle: (params) => API.GET(g.config.server + '/operation/v1/agentSettle/listOperationSettle', params),
  // 审核通过、驳回前的查询
  queryDetail: (params) => API.POST(g.config.server + '/operation/v1/agentSettle/queryDetail', params),
  // 运营审核拒绝
  operationReject: (params) => API.POST(g.config.server + '/operation/v1/agentSettle/operationReject', params),
  // 运营审核通过
  operationSuccess: (params) => API.POST(g.config.server + '/operation/v1/agentSettle/operationSuccess', params),
  // 佣金结算
  querySettleSum: (params) => API.POST(g.config.server + 'operation/v1/topAgentSettle/querySettleSum', params),
  // 佣金结算
  SettlequeryByPage: (params) => API.POST(g.config.server + 'operation/v1/topAgentSettle/queryByPage', params),
  // 佣金结算
  submitSettle: (params) => API.POST(g.config.server + 'operation/v1/topAgentSettle/submitSettle', params),
  // 支付宝服务商分润奖励分页查询
  aliAgents: (params) => API.GET(g.config.server + '/operation/v1/direct/reward/aliAgents', params),
  // 支付宝商户分润奖励明细分页查询
  aliMerchants: (params) => API.GET(g.config.server + '/operation/v1/direct/reward/aliMerchants', params),
  // 微信服务商分润奖励分页查询
  wxAgents: (params) => API.GET(g.config.server + '/operation/v1/direct/reward/wxAgents', params),
  // 微信商户分润奖励明细分页查询
  wxMerchants: (params) => API.GET(g.config.server + '/operation/v1/direct/reward/wxMerchants', params)
}

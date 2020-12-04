import * as API from '.';

export default {
  // 财务审核-财务续费审核-查询详情
  getById: (params) => API.GET('/operation/v1/agentRenewAudit/getById', params),
  // 财务审核-财务续费审核-通过财务续费审核
  updateAuditStatusOfPass: (params) => API.GET('/operation/v1/agentRenewAudit/updateAuditStatusOfPass', params),
  // 财务审核-财务续费审核-驳回财务续费审核
  updateAuditStatusOfReject: (params) => API.GET('/operation/v1/agentRenewAudit/updateAuditStatusOfReject', params),
  // 财务审核-财务订购审核-订购审核分页列表
  deviceAuditPage: (params) => API.GET('/operation/v1/financeAudit/deviceAuditPage', params),
  // 财务审核-财务订购审核-财务订购审核通过
  deviceAuditPass: (params) => API.POST('/operation/v1/financeAudit/deviceAuditPass', params),
  // 财务审核-财务订购审核-财务订购审核驳回
  deviceAuditReject: (params) => API.POST('/operation/v1/financeAudit/deviceAuditReject', params),
  // 顶级佣金审核-运营审核列表查询
  topListOperationSettle: (params) => API.POST('/operation/v1/topAgentAudit/topListOperationSettle', params),
  // 服务商-运营审核列表查询
  listOperationSettle: (params) => API.POST('/operation/v1/agentSettle/listOperationSettle', params),
  // 顶级佣金审核-运营审核通过
  topOperationSuccess: (params) => API.POST('/operation/v1/topAgentAudit/operationSuccess', params),
  // 服务商-运营审核通过
  operationSuccess: (params) => API.POST('/operation/v1/agentSettle/operationSuccess', params),
  // 顶级佣金审核-运营审核拒绝
  topOperationReject: (params) => API.POST('/operation/v1/topAgentAudit/operationReject', params),
  // 服务商-运营审核拒绝
  operationReject: (params) => API.POST('/operation/v1/agentSettle/operationReject', params),
  // 顶级佣金审核-审核通过、驳回前的查询
  topQueryDetail: (params) => API.POST('/operation/v1/topAgentAudit/queryDetail', params),
  // 服务商-审核通过、驳回前的查询
  queryDetail: (params) => API.POST('/operation/v1/agentSettle/queryDetail', params),
  // 顶级服务商-列表详情
  topQueryTypeMonthDetail: (params) => API.POST('/operation/v1/topAgentAudit/queryTypeMonthDetail', params),
  // 服务商-列表详情
  queryTypeMonthDetail: (params) => API.POST('/operation/v1/agentSettle/queryTypeMonthDetail', params),
  // 顶级服务商-财务审核通过
  topFinanceSuccess: (params) => API.POST('/operation/v1/topAgentAudit/financeSuccess', params),
  // 服务商-财务审核通过
  financeSuccess: (params) => API.POST('/operation/v1/agentSettle/financeSuccess', params),
  // 顶级服务商-财务审核拒绝
  topFinanceReject: (params) => API.POST('/operation/v1/topAgentAudit/financeReject', params),
  // 服务商-财务审核拒绝
  financeReject: (params) => API.POST('/operation/v1/agentSettle/financeReject', params),
  // 顶级服务商-财务审核列表查询
  topListFinanceSettle: (params) => API.POST('/operation/v1/topAgentAudit/listFinanceSettle', params),
  // 服务商-财务审核列表查询
  listFinanceSettle: (params) => API.POST('/operation/v1/agentSettle/listFinanceSettle', params),

  queryByPage: (params) => API.GET('/operation/v1/agentRenewAudit/queryByPage', params)
};

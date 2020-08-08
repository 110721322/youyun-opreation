import * as API from '.';

export default {
  getById: (params) => API.GET('/operation/v1/agentRenewAudit/getById', params),
  updateAuditStatusOfPass: (params) => API.GET('/operation/v1/agentRenewAudit/updateAuditStatusOfPass', params),
  updateAuditStatusOfReject: (params) => API.GET('/operation/v1/agentRenewAudit/updateAuditStatusOfReject', params),
  queryByPage: (params) => API.GET('/operation/v1/agentRenewAudit/queryByPage', params),
  listOperationSettle: (params) => API.GET('/operation/v1/agentSettle/listOperationSettle', params),
  queryTypeMonthDetail: (params) => API.GET('/operation/v1/agentSettle/queryTypeMonthDetail', params),
  queryDetail: (params) => API.GET('/operation/v1/agentSettle/queryDetail', params),
  operationSuccess: (params) => API.POST('/operation/v1/agentSettle/operationSuccess', params),
  operationReject: (params) => API.POST('/operation/v1/agentSettle/operationReject', params),
  listFinanceSettle: (params) => API.GET('/operation/v1/agentSettle/listFinanceSettle', params),
  financeSuccess: (params) => API.POST('/operation/v1/agentSettle/financeSuccess', params),
  financeReject: (params) => API.GET('/operation/v1/agentSettle/financeReject', params),
  deviceAuditPage: (params) => API.GET('/operation/v1/financeAudit/deviceAuditPage', params),
  deviceAuditPass: (params) => API.POST('/operation/v1/financeAudit/deviceAuditPass', params),
  deviceAuditReject: (params) => API.POST('/operation/v1/financeAudit/deviceAuditReject', params),
  // 顶级佣金审核-运营审核列表查询
  topListOperationSettle: (params) => API.POST('/operation/v1/topAgentAudit/topListOperationSettle', params),
  // 顶级佣金审核-运营审核通过
  topOperationSuccess: (params) => API.POST('/operation/v1/topAgentAudit/operationSuccess', params),
  // 顶级佣金审核-运营审核拒绝
  topOperationReject: (params) => API.POST('/operation/v1/topAgentAudit/operationReject', params),
  // 顶级佣金审核-审核通过、驳回前的查询
  topQueryDetail: (params) => API.POST('/operation/v1/topAgentAudit/queryDetail', params),
  topQueryTypeMonthDetail: (params) => API.POST('/operation/v1/topAgentAudit/queryTypeMonthDetail', params)
};

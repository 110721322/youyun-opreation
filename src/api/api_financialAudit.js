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
  deviceAuditReject: (params) => API.POST('/operation/v1/financeAudit/deviceAuditReject', params)
};

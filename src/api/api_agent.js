import * as API from '.';

export default {
  agentList: (params) => API.GET('/operation/v1/agent/queryPageByCondition', params),
  agentExamineList: (params) => API.GET('/operation/v1/agentAudit/queryAuditPageByCondition', params),
  subagentExamineList: (params) => API.GET('/operation/v1/agentAudit/querySubAuditPageByCondition', params),
  reject: (params) => API.GET('/operation/v1/agentAudit/updateAuditStatusOfReject', params),
  pass: (params) => API.GET('/operation/v1/agentAudit/updateAuditStatusOfPass', params),
  activate: (params) => API.GET('/operation/v1/agentAudit/updateAuditStatusOfActivate', params),
  subreject: (params) => API.GET('/operation/v1/agentAudit/updateSubAuditStatusOfReject', params),
  subpass: (params) => API.GET('/operation/v1/agentAudit/updateSubAuditStatusOfPass', params),
  transferOperate: (params) => API.GET('/operation/v1/agent/updateOperateUserNo', params),
  frozen: (params) => API.GET('/operation/v1/agent/updateAccountStatusOfFrozen', params),
  unfrozen: (params) => API.GET('/operation/v1/agent/updateAccountStatusOfUnfrozen', params),
  getAgentDetail: (params) => API.GET('/operation/v1/agent/getAgentDetail', params),
  // 分润总览
  totalCommission: (params) => API.GET('/operation/v1/commission/queryTotalCommission', params),
  agentCommission: (params) => API.GET('/operation/v1/commission/listAgentCommission', params),
  merchantCommission: (params) => API.GET('/operation/v1/commission/listMerchantCommission', params),
  planCount: (params) => API.GET('/operation/v1/talkPlan/queryWaitExecutePlanCount', params),
  queryPlan: (params) => API.GET('/operation/v1/talkPlan/queryByPage', params),
  queryPlanList: (params) => API.GET('/operation/v1/talkLists/queryByPage', params)
};

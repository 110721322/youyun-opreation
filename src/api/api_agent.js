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
  unfrozen: (params) => API.GET('/operation/v1/agent/updateAccountStatusOfUnfrozen', params)

};

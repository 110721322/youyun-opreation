import * as API from '.';

export default {
  agentList: (params) => API.GET('/operation/v1/agent/queryPageByCondition', params),
  agentExamineList: (params) => API.GET('/operation/v1/agentAudit/queryAuditPageByCondition', params)

};

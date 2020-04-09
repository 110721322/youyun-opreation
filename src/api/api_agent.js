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
  queryPlanList: (params) => API.GET('/operation/v1/talkLists/queryByPage', params),
  // 订单管理
  hardwarePageOrder: (params) => API.GET('/operation/v1/deviceOrder/hardwarePageOrder', params),
  hardwareDetail: (params) => API.GET('/operation/v1/deviceOrder/hardwareDetail', params),
  // 广告权限
  advertPrivilege: (params) => API.GET('/operation/v1/advertPrivilege/queryByPage', params),
  advertPrivilegeUpdate: (params) => API.POST('/operation/v1/advertPrivilege/update', params),
  queryAllPrivilege: (params) => API.GET('/operation/v1/advertPrivilege/queryAllPrivilege', params),
  advertList: (params) => API.GET('/operation/v1/advert/queryByPage', params),
  advertDelete: (params) => API.GET('/operation/v1/advert/delete', params),
  advertAdd: (params) => API.GET('/operation/v1/advert/add', params),
  advertUpdate: (params) => API.GET('/operation/v1/advert/update', params),
  queryById: (params) => API.GET('operation/v1/advertDistribute/queryById', params),
  putList: (params) => API.GET('/operation/v1/advertDistribute/queryByPage', params),
  advertDistributeAdd: (params) => API.GET('/operation/v1/advertDistribute/add', params),
  advertDistributeUpdate: (params) => API.GET('/operation/v1/advertDistribute/update', params),
  // 运营结算审核
  listOperationSettle: (params) => API.GET('/operation/v1/agentSettle/listOperationSettle', params),
  // 第三方对接列表
  queryByPage: (params) => API.GET('/operation/v1/agentOpenConfig/queryByPage', params),
  updateOfFrozen: (params) => API.GET('/operation/v1/agentOpenConfig/updateOfFrozen', params),
  updateOfUnFrozen: (params) => API.GET('/operation/v1/agentOpenConfig/updateOfUnFrozen', params),
  add: (params) => API.GET('/operation/v1/agentOpenConfig/add', params),
  update: (params) => API.GET('/operation/v1/agentOpenConfig/update', params)
};

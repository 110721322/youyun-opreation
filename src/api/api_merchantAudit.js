import * as API from '.';

export default {
  queryLeshuaAuditPageByCondition: (params) => API.GET('/operation/v1/merchantAudit/queryLeshuaAuditPageByCondition', params),
  queryWechatAuditPageByCondition: (params) => API.GET('/operation/v1/merchantAudit/queryWechatAuditPageByCondition', params),
  queryAlipayAuditPageByCondition: (params) => API.GET('/operation/v1/merchantAudit/queryAlipayAuditPageByCondition', params),
  merchantUpdateAuditStatusOfPass: (params) => API.POST('/operation/v1/merchantAudit/updateAuditStatusOfPass', params),
  merchantUpdateAuditStatusOfReject: (params) => API.POST('/operation/v1/merchantAudit/updateAuditStatusOfReject', params),
  preAuditRecordQueryByPage: (params) => API.GET('/operation/v1/merchantPreAuditRecord/queryByPage', params),
  settleCardAuditQueryByPage: (params) => API.GET('/operation/v1/merchantSettleCardAudit/queryByPage', params),
  getMerchantSettleDetail: (params) => API.POST('/operation/v1/merchantSettleCardAudit/getMerchantSettleDetail', params),
  settleCardUpdateAuditStatusOfPass: (params) => API.POST('/operation/v1/merchantSettleCardAudit/updateAuditStatusOfPass', params),
  settleCardUpdateAuditStatusOfReject: (params) => API.POST('/operation/v1/merchantSettleCardAudit/updateAuditStatusOfReject', params),
  queryAuditPageByCondition: (params) => API.GET('/operation/v1/agentPartnerAudit/queryAuditPageByCondition', params),
  agentPartnerUpdateAuditStatusOfPass: (params) => API.GET('/operation/v1/agentPartnerAudit/updateAuditStatusOfPass', params),
  agentPartnerUpdateAuditStatusOfReject: (params) => API.GET('/operation/v1/agentPartnerAudit/updateAuditStatusOfReject', params),
  querySubAuditPageByCondition: (params) => API.GET('/operation/v1/agentAudit/querySubAuditPageByCondition', params),
  updateSubAuditStatusOfPass: (params) => API.GET('/operation/v1/agentAudit/updateSubAuditStatusOfPass', params),
  updateSubAuditStatusOfReject: (params) => API.GET('/operation/v1/agentAudit/updateSubAuditStatusOfReject', params),
  updateOthersInfo: (params) => API.POST('/operation/v1/merchantAudit/updateOthersInfo', params),
  getDetailByMerchantNo: (params) => API.POST('/operation/v1/merchantAudit/getDetailByMerchantNo', params),
  getDetailByPartnerNo: (params) => API.GET('/operation/v1/agentPartnerAudit/getDetailByPartnerNo', params),
  getSubAgentDetail: (params) => API.GET('/operation/v1/agent/getSubAgentDetail', params),
  getDownloadUrl: (params) => API.GET('/operation/v1/merchantAudit/getDownloadUrl', params)

};

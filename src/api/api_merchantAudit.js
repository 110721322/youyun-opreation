import * as API from '.';

export default {
  // 分页查询乐刷商户审核列表
  queryLeshuaAuditPageByCondition: (params) => API.GET('/operation/v1/merchantAudit/queryIndirectAuditPageByCondition', params),
  // 分页查询微信商户审核列表
  queryWechatAuditPageByCondition: (params) => API.GET('/operation/v1/merchantAudit/queryWechatAuditPageByCondition', params),
  // 分页查询支付宝商户审核列表
  queryAlipayAuditPageByCondition: (params) => API.GET('/operation/v1/merchantAudit/queryAlipayAuditPageByCondition', params),
  // 间连审核-平台通过商户审核
  passIndirectAudit: (params) => API.POST('/operation/v1/merchantAudit/passIndirectAudit', params),
  // 间连审核-平台驳回商户审核
  rejectIndirectAudit: (params) => API.POST('/operation/v1/merchantAudit/rejectIndirectAudit', params),
  // 间联审核-通道商户审核详情
  getChannelMerchantDetailByNo: (params) => API.GET('/operation/v1/merchant/getChannelMerchantDetailByNo', params),
  // 直连审核-平台驳回商户审核
  rejectDirectAudit: (params) => API.POST('/operation/v1/merchantAudit/rejectDirectAudit', params),
  // 直连审核-平台通过商户审核
  passDirectAudit: (params) => API.POST('/operation/v1/merchantAudit/passDirectAudit', params),
  // 直连审核-通道通过商户审核
  passDirectChannelAudit: (params) => API.POST('/operation/v1/merchantAudit/passDirectChannelAudit', params),
  // 直连审核-通道驳回商户审核
  rejectDirectChannelAudit: (params) => API.POST('/operation/v1/merchantAudit/rejectDirectChannelAudit', params),
  merchantUpdateAuditStatusOfPass: (params) => API.POST('/operation/v1/merchantAudit/updateAuditStatusOfPass', params),
  merchantUpdateAuditStatusOfReject: (params) => API.POST('/operation/v1/merchantAudit/updateAuditStatusOfReject', params),
  // 预审核列表
  preAuditRecordQueryByPage: (params) => API.GET('/operation/v1/merchantPreAuditRecord/queryByPage', params),
  // 结算卡审核-列表
  settleCardAuditQueryByPage: (params) => API.GET('/operation/v1/merchantSettleCardAudit/queryByPage', params),
  // 结算卡审核-详情
  getMerchantSettleDetail: (params) => API.GET('/operation/v1/merchantSettleCardAudit/getMerchantSettleDetail', params),
  // 结算卡审核-通过
  updateAuditStatusOfPass: (params) => API.POST('/operation/v1/merchantSettleCardAudit/updateAuditStatusOfPass', params),
  // 结算卡审核-驳回
  updateAuditStatusOfReject: (params) => API.GET('/operation/v1/merchantSettleCardAudit/updateAuditStatusOfReject', params),
  // 合伙人审核-分页查询服务商审核列表
  queryAuditPageByCondition: (params) => API.GET('/operation/v1/agentPartnerAudit/queryAuditPageByCondition', params),
  // 合伙人审核-通过合伙人审核
  agentPartnerUpdateAuditStatusOfPass: (params) => API.GET('/operation/v1/agentPartnerAudit/updateAuditStatusOfPass', params),
  // 合伙人审核-驳回合伙人审核
  agentPartnerUpdateAuditStatusOfReject: (params) => API.GET('/operation/v1/agentPartnerAudit/updateAuditStatusOfReject', params),
  // 修改商户详情-其他信息
  updateOthersInfo: (params) => API.POST('/operation/v1/merchantAudit/updateOthersInfo', params),
  // 商户审核详情
  getDetailByMerchantNo: (params) => API.GET('/operation/v1/merchantAudit/getDetailByMerchantNo', params),
  // 获取下载包资料
  merchantInfoDownload: (params) => API.GET('/operation/v1/merchantAudit/merchantInfoDownload', params),
  // 合伙人审核-合伙人详情
  getDetailByPartnerNo: (params) => API.GET('/operation/v1/agentPartnerAudit/getDetailByPartnerNo', params),
  // 下级服务商审核-审核列表
  querySubAuditPageByCondition: (params) => API.GET('/operation/v1/agentAudit/querySubAuditPageByCondition', params),
  // 下级服务商审核-下级服务商详情
  getSubAgentDetail: (params) => API.GET('/operation/v1/agent/getSubAgentDetail', params),
  // 下级服务商审核-通过
  updateSubAuditStatusOfPass: (params) => API.GET('/operation/v1/agentAudit/updateSubAuditStatusOfPass', params),
  // 下级服务商审核-驳回
  updateSubAuditStatusOfReject: (params) => API.GET('/operation/v1/agentAudit/updateSubAuditStatusOfReject', params),
  getDownloadUrl: (params) => API.GET('/operation/v1/merchantAudit/getDownloadUrl', params)
};

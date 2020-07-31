import * as API from '.';

export default {
  // 服务商风控-列表
  agentBanListQueryByPage: (params) => API.GET('/operation/v1/agentBanList/queryByPage', params),
  // 服务商分控-新增入件黑名单
  agentBanListAdd: (params) => API.POST('/operation/v1/agentBanList/add', params),
  // 服务商风控-移除
  deleteByAgentNo: (params) => API.POST('/operation/v1/agentBanList/deleteByAgentNo', params, { changeContent: true }),
  // 商户风控-列表
  merchantBanListQueryByPage: (params) => API.GET('/operation/v1/merchantBanList/queryByPage', params),
  // 商户风控-新增风控信息
  merchantBanListAdd: (params) => API.POST('/operation/v1/merchantBanList/add', params),
  // 商户风控-移出
  deleteById: (params) => API.POST('/operation/v1/merchantBanList/deleteById', params),
  // 商户风控-移入黑名单
  updateOfBlack: (params) => API.POST('/operation/v1/merchantBanList/updateOfBlack', params),
  // 商户风控-移入灰名单
  updateOfGray: (params) => API.POST('/operation/v1/merchantBanList/updateOfGray', params),
  // 商户风控-黑名单拦截记录-列表
  merchantBanFilterLogQueryByPage: (params) => API.GET('/operation/v1/merchantBanFilterLog/queryByPage', params),
  // 乐刷风控-列表
  leshuaQueryByPage: (params) => API.GET('/operation/v1/merchantBanAppeal/leshua/queryByPage', params),
  // 平台风控-列表
  midPlatformQueryByPage: (params) => API.GET('/operation/v1/merchantBanAppeal/midPlatform/queryByPage', params),
  // 风控申诉-详情
  appealGetData: (params) => API.GET('/operation/v1/merchantBanAppeal/getDetail', params),
  leshuaGetDetail: (params) => API.POST('/operation/v1/merchantBanAppeal/leshua/getDetail', params),
  midPlatformGetDetail: (params) => API.POST('/operation/v1/merchantBanAppeal/midPlatform/getDetail', params),
  // 乐刷风控-通过
  leshuaUpdateOfPass: (params) => API.POST('/operation/v1/merchantBanAppeal/leshua/updateOfPass', params),
  // 平台风控-通过
  midPlatformUpdateOfPass: (params) => API.POST('/operation/v1/merchantBanAppeal/midPlatform/updateOfPass', params),
  // 乐刷风控-预审核通过
  updateOfPrePass: (params) => API.POST('/operation/v1/merchantBanAppeal/leshua/updateOfPrePass', params),
  // 乐刷风控-驳回
  leshuaUpdateOfReject: (params) => API.POST('/operation/v1/merchantBanAppeal/leshua/updateOfReject', params),
  // 平台风控-驳回
  midPlatformUpdateOfReject: (params) => API.POST('/operation/v1/merchantBanAppeal/midPlatform/updateOfReject', params),
  // 乐刷风控-预审核驳回
  updateOfPreReject: (params) => API.POST('/operation/v1/merchantBanAppeal/leshua/updateOfPreReject', params),
  // 审核记录-列表
  queryByCondition: (params) => API.GET('/operation/v1/merchantBanAppealAuditLog/queryByCondition', params),
  // 乐刷风控-下载资料包
  getDownloadUrl: (params) => API.GET('/operation/v1/leshua/getDownloadUrl', params)
};

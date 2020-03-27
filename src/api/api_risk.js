import * as API from '.';

export default {
  agentBanListQueryByPage: (params) => API.GET('/operation/v1/agentBanList/queryByPage', params),
  agentBanListAdd: (params) => API.POST('/operation/v1/agentBanList/add', params),
  deleteByAgentNo: (params) => API.POST('/operation/v1/agentBanList/deleteByAgentNo', params),
  merchantBanListQueryByPage: (params) => API.GET('/operation/v1/merchantBanList/queryByPage', params),
  merchantBanListAdd: (params) => API.POST('/operation/v1/merchantBanList/add', params),
  deleteById: (params) => API.POST('/operation/v1/merchantBanList/deleteById', params),
  updateOfBlack: (params) => API.POST('/operation/v1/merchantBanList/updateOfBlack', params),
  updateOfGray: (params) => API.POST('/operation/v1/merchantBanList/updateOfGray', params),
  merchantBanFilterLogQueryByPage: (params) => API.GET('/operation/v1/merchantBanFilterLog/queryByPage', params),
  leshuaQueryByPage: (params) => API.GET('/operation/v1/merchantBanAppeal/leshua/queryByPage', params),
  midPlatformQueryByPage: (params) => API.GET('/operation/v1/merchantBanAppeal/midPlatform/queryByPage', params),
  leshuaGetDetail: (params) => API.POST('/operation/v1/merchantBanAppeal/leshua/getDetail', params),
  midPlatformGetDetail: (params) => API.POST('/operation/v1/merchantBanAppeal/midPlatform/getDetail', params),
  leshuaUpdateOfPass: (params) => API.POST('/operation/v1/merchantBanAppeal/leshua/updateOfPass', params),
  midPlatformUpdateOfPass: (params) => API.POST('/operation/v1/merchantBanAppeal/midPlatform/updateOfPass', params),
  updateOfPrePass: (params) => API.POST('/operation/v1/merchantBanAppeal/leshua/updateOfPrePass', params),
  leshuaUpdateOfReject: (params) => API.POST('/operation/v1/merchantBanAppeal/leshua/updateOfReject', params),
  midPlatformUpdateOfReject: (params) => API.POST('/operation/v1/merchantBanAppeal/midPlatform/updateOfReject', params),
  updateOfPreReject: (params) => API.POST('/operation/v1/merchantBanAppeal/leshua/updateOfPreReject', params),
  queryByCondition: (params) => API.GET('/operation/v1/merchantBanAppealAuditLog/queryByCondition', params),
  getDownloadUrl: (params) => API.GET('/operation/v1/leshua/getDownloadUrl', params)
};

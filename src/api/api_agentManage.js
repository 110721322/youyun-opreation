import * as API from '.';
// 1: () => API.GET(''),
const api = {
  // 服务商数量统计
  totalAgentNum: () => API.GET('/operation/v1/agent/totalAgentNum'),
  // 服务商列表查询
  queryPageByCondition: (params) => API.GET('/operation/v1/agent/queryPageByCondition', params),
  // 批量修改服务商管理员
  updateOperationId: (params) => API.GET('/operation/v1/agent/updateOperationId', params),
  // 查询服务商状态枚举
  getAgentStatus: () => API.GET('/operation/v1/agent/getAgentStatus'),
  // 获取所有大区配置
  queryAllRegion: () => API.GET('/operation/v1/region/queryAllRegion'),
  // 查询运营管理人员列表
  queryAllOperation: () => API.GET('/operation/v1/advertPrivilege/queryAllOperation'),
  // 详情-查询服务商信息
  getAgentDetail: (params) => API.GET('/operation/v1/agent/getAgentDetail', params),
  // 详情-启用服务商
  updateStatusUnfrozen: (params) => API.GET('/operation/v1/agent/updateAccountStatusOfUnfrozen', params),
  // 详情-禁用服务商
  updateStatusFrozen: (params) => API.GET('/operation/v1/agent/updateAccountStatusOfFrozen', params),
  // 详情-重置服务商密码
  resetPassword: (params) => API.GET('/operation/v1/agent/resetPassword', params),
  // 详情-沟通记录分页查询
  queryByPage: (params) => API.GET('/operation/v1/talkLists/queryByPage', params),
  // 详情-新增服务商沟通记录
  addTalk: (params) => API.GET('/operation/v1/talkLists/add/agent', params),
  // 新增服务商
  addAgent: (params) => API.POST('/operation/v1/agent/addAgent', params)
};

export default api
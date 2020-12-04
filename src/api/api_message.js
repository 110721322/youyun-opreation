import * as API from '.';

export default {
  // 服务商公告-新增服务商公告
  add: (params) => API.POST('/operation/v1/notice/add', params),
  // 服务商公告-删除服务商公告
  delete: (params) => API.POST('/operation/v1/notice/delete', params),
  // 服务商公告-分页查询服务商公告列表
  queryByPage: (params) => API.GET('/operation/v1/notice/queryByPage', params),
  // 服务商公告-查询单个服务商公告
  queryNoticeByPrimaryId: (params) => API.GET('/operation/v1/notice/queryNoticeByPrimaryId', params),
  // 服务商公告-读取服务商公告
  readNotice: (params) => API.POST('/operation/v1/notice/readNotice', params),
  // 服务商公告-获取所有未读取的公告
  selectAllUnreadNotices: (params) => API.GET('/operation/v1/notice/selectAllUnreadNotices', params),
  // 服务商公告-设置未读取的公告提示
  setExpireKeyOfNotice: (params) => API.POST('/operation/v1/notice/setExpireKeyOfNotice', params),
  // 服务商公告-修改服务商公告
  update: (params) => API.POST('/operation/v1/notice/update', params)
};

import * as API from '.';

export default {
  add: (params) => API.POST('/operation/v1/notice/add', params),
  delete: (params) => API.POST('/operation/v1/notice/delete', params),
  queryByPage: (params) => API.GET('/operation/v1/notice/queryByPage', params),
  queryNoticeByPrimaryId: (params) => API.GET('/operation/v1/notice/queryNoticeByPrimaryId', params),
  readNotice: (params) => API.POST('/operation/v1/notice/readNotice', params),
  selectAllUnreadNotices: (params) => API.GET('/operation/v1/notice/selectAllUnreadNotices', params),
  setExpireKeyOfNotice: (params) => API.POST('/operation/v1/notice/setExpireKeyOfNotice', params),
  update: (params) => API.POST('/operation/v1/notice/update', params)
};

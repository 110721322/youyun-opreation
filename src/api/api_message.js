import * as API from '.';

export default {
  queryByPage: (params) => API.GET('/operation/v1/notice/queryByPage', params),
  queryNoticeByPrimaryId: (params) => API.GET('/operation/v1/notice/queryNoticeByPrimaryId', params),
  add: (params) => API.POST('/operation/v1/notice/add', params),
  update: (params) => API.POST('/operation/v1/notice/update', params),
  selectAllUnreadNotices: (params) => API.GET('/operation/v1/notice/selectAllUnreadNotices', params),
  readNotice: (params) => API.POST('/operation/v1/notice/readNotice', params),
  setExpireKeyOfNotice: (params) => API.POST('//operation/v1/notice/setExpireKeyOfNotice', params),
  delete: (params) => API.POST('/operation/v1/notice/delete', params)
};

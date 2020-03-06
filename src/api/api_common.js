import * as API from '.';

export default {
  // json
  getMenuList: (params) => API.GET('/api/agent/login/obtain_privilege', params),
  // 获取图片上传token
  uploadPic: (params) => API.GET('/api/agent/agent_partner/get_upload_token', params),
  EntryUploadPic: (params) => API.GET('/api/agent/merchant_data/get_upload_token', params)
};

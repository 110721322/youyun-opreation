import * as API from '.';
import * as g from '../libs/global';

export default {
  // json
  getMenuList: (params) => API.GET('/api/agent/login/obtain_privilege', params),
  // 获取图片上传token
  uploadPic: (params) => API.GET(g.config.fileDownloadUrl + '/common/v1/oss/queryOssToken?type=common', params),
  EntryUploadPic: (params) => API.GET('/api/agent/merchant_data/get_upload_token', params)
};

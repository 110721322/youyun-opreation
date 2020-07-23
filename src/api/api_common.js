import * as API from '.';
import * as g from '../libs/global';

export default {
  // json
  getMenuList: (params) => API.GET('/api/agent/login/obtain_privilege', params),
  uploadPic: () => API.POST(g.config.fileDownloadUrl + '/common/v1/oss/queryOssToken?type=common'), // 获取图片上传token
  EntryUploadPic: (params) => API.GET('/api/agent/merchant_data/get_upload_token', params),
  excelUploadPic: (params) => API.POST('/operation/v1/excelTemplate/upload', params), // 上传excel
  uploadPicExcel: () => API.POST(g.config.fileDownloadUrl + '/common/v1/oss/queryOssToken?type=excel'), // 获取图片上传token
  downloadExcel: (params) => API.GET('/operation/v1/excelTemplate/download', params),
  // 查询顶级代理商下的运营人员
  listOperations: () => API.GET('/operation/v1/baseInfo/listOperations')
};

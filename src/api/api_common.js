import * as API from '.';

export default {
  // 获取菜单登录按钮列表
  getMenuList: (params) => API.GET('/api/agent/login/obtain_privilege', params),
  // 获取图片上传token
  uploadPic: () => API.POST('/common/v1/oss/queryOssToken?type=common'),
  EntryUploadPic: (params) => API.GET('/api/agent/merchant_data/get_upload_token', params),
  // excel上传解析
  excelUploadPic: (params) => API.POST('/operation/v1/excelTemplate/upload', params),
  // 获取图片上传token
  uploadPicExcel: () => API.POST('/common/v1/oss/queryOssToken?type=excel'),
  // 查询顶级代理商下的运营人员
  listOperations: () => API.GET('/operation/v1/baseInfo/listOperations'),
  // 获取zip下载进度
  zipTask: (params) => API.GET('/common/v1/progress/zipTask', params),
  // 获取zip下载完成结果
  zipResult: (params) => API.GET('/common/v1/progress/result', params)
};

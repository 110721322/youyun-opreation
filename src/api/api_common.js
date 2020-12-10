import * as API from '.';
import store from "@/store"

export default {
  getSmsCode: (params) => API.POST('/fund/v1/common/sendCode', params),
  uploadPic: () => API.POST('/fund/v1/oss/queryOssToken?type=fund'), // 获取图片上传token
  EntryUploadPic: (params) => API.GET('/api/agent/merchant_data/get_upload_token', params),
  uploadPicExcel: () => API.POST('/fund/v1/oss/queryOssToken?type=excel'), // 获取图片上传token
  uploadExcel: (params) => API.POST('/fund/v1/excel/upload', params), // 提交oss地址
  confirmExcel: (params) => API.POST('/fund/v1/excel/confirm', params), // 提交oss地址
  queryAllManager: () => API.GET('/fund/v1/common/queryAllManager').then(res => store.dispatch('saveManagerList', res.data)), // 查询管理员/操作人
  queryAllRole: () => API.GET('/fund/v1/common/queryAllRole').then(res => store.dispatch('saveRoleList', res.data)), // 查询权限组
  queryAllUser: () => API.GET('/fund/v1/common/queryAllUser').then(res => store.dispatch('saveCustomerList', res.data)), // 查询添加人
  queryAllBusiness: (params = {}) => {
    if (params.businessName) {
      params.businessName = params.businessName.split("_")[0]
    }
    return API.POST('/fund/v1/common/queryUsableBusiness', params, {noLoading: true})
  }, // 获取交易户列表
  queryShops: (params) => API.GET('/fund/v1/common/queryShops', params, {noLoading: true}), // 获取门店列表
  queryBusinessByAreas: (params) => API.POST('/fund/v1/common/queryBusinessByAreas', params, {noLoading: true}), // 根据传的管理区域获取交易户
  querySuppliers: (params) => API.GET('/fund/v1/common/querySuppliers', params, {noLoading: true}), // 获取供应商列表
  queryAddressByPage: (params) => API.GET('/fund/v1/area/queryAddressByPage', params, {noLoading: true}), // 获取供应商列表
  queryMap: () => API.GETJSON('static/geo.json'), // 获取交易户列表
  queryInit: (params) => API.GET('/fund/v1/common/queryInit', params, {noLoading: true}), // 初始化查询枚举数据
  downloadZip: (params) => API.GET('/fund/v1/zip/download/result', params) // 获取zip下载完成结果下载地址
};

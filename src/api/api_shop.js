import * as API from '.';
export default {
  // 门店列表
  shopQueryByPage: (params) => API.GET('/operation/v1/shop/queryByPage', params),
  // 门店详情
  shopQueryDetail: (params) => API.GET('/operation/v1/shop/queryDetail', params),
  // 门店启用禁用
  shopUpdate: (params) => API.POST('/operation/v1/shop/update', params, {needFormData: true}),
  // 门店编辑
  shopEditDetail: (params) => API.POST('/operation/v1/shop/editDetail', params, {needFormData: true}),
  // 门店审核-通过
  passIndirectAudit: (params) => API.POST('/operation/v1/shop/passIndirectAudit', params, {needFormData: true}),
  // 门店审核驳回
  rejectIndirectAudit: (params) => API.POST('/operation/v1/shop/rejectIndirectAudit', params, {needFormData: true}),
  // 查询门店类目
  queryAllCategory: (params) => API.GET('/agent/v1/shop/queryAllCategory', params),
  // 查询服务商下的所有商户
  selectAllMerchant: (params) => API.GET('/agent/v1/merchantNew/selectAllMerchant', params),
  // 根据条件查询门店列表
  selectShopByConditon: (params) => API.GET('/operation/v1/shop/selectShopByConditon', params)
}

import * as API from '.';

export default {
  // 优惠码活动-关闭活动
  closeActivity: (params) => API.POST('/operation/v1/promoCode/closeActivity', params),
  // 优惠码活动-创建优惠码
  createPromoCode: (params) => API.POST('/operation/v1/promoCode/createPromoCode', params),
  // 优惠码活动-领取优惠码
  getsPromoCode: (params) => API.POST('/operation/v1/promoCode/getsPromoCode', params),
  // 优惠码活动-分页查询
  promoCodeQueryByPage: (params) => API.POST('/operation/v1/promoCode/queryByPage', params),
  // 优惠码活动-活动明细查询
  promoCodeQueryDetails: (params) => API.POST('/operation/v1/promoCode/queryDetails', params),
  // 优惠码-根据二维码编号查询二维码信息
  queryQrCodeDetail: (params) => API.GET('/operation/v1/promoCode/queryQrCodeDetail', params),
  // 优惠密码活动-优惠码名称获取优惠码id
  selectByName: (params) => API.GET('/operation/v1/promoCode/selectByName', params),
  // 优惠码-明细查询中的优惠码使用情况统计
  queryDetailCount: (params) => API.POST('/operation/v1/promoCode/queryDetailCount', params, {changeContent: true})
};

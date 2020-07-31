import * as API from '.';

export default {
  closeActivity: (params) => API.POST('/operation/v1/promoCode/closeActivity', params),
  createPromoCode: (params) => API.POST('/operation/v1/promoCode/createPromoCode', params),
  getsPromoCode: (params) => API.POST('/operation/v1/promoCode/getsPromoCode', params),
  promoCodeQueryByPage: (params) => API.POST('/operation/v1/promoCode/queryByPage', params),
  promoCodeQueryDetails: (params) => API.POST('/operation/v1/promoCode/queryDetails', params),
  queryQrCodeDetail: (params) => API.POST('/operation/v1/promoCode/queryQrCodeDetail', params),
  selectByName: (params) => API.GET('/operation/v1/promoCode/selectByName', params),
  queryDetailCount: (params) => API.POST('/operation/v1/promoCode/queryDetailCount', params, {changeContent: true})
};

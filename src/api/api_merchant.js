import * as API from '.';

export default {
  queryPageByCondition: (params) => API.GET('/operation/v1/merchant/queryPageByCondition', params),
  getDetailByMerchantNo: (params) => API.GET('/operation/v1/merchant/getDetailByMerchantNo', params),
  queryPageMerchantSettleByCondition: (params) => API.GET('/operation/v1/merchant/queryPageMerchantSettleByCondition', params)
};

import * as API from '.';

export default {
    // 财务专员
    totalDataC: (params) => API.GET('/api/merchant/everyday_merchant_deal_statistics/get_merchant_total_deal', params),
    lineDataC: (params) => API.GET('/api/merchant/everyday_merchant_deal_statistics/get_merchant_broken_line', params),

    // 店长
    totalDataD: (params) => API.GET('/api/merchant/everyday_shop_deal_statistics/get_shop_total_deal', params),
    lineDataD: (params) => API.GET('/api/merchant/everyday_shop_deal_statistics/get_shop_broken_line', params),
};

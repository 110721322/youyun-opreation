import * as API from '.';
export default {
  // 订单记录
  orderSelectByPage: (params) => API.GET('/operation/v1/order/selectByPage', params),
  // 订单详情
  selectOrderDetails: (params) => API.POST('/operation/v1/order/selectOrderDetails', params),
  // 订单流水
  selectOrderWater: (params) => API.POST('/operation/v1/order/selectOrderWater', params)
}

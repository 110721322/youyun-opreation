import * as API from '.';
export default {
  // 订单记录
  orderSelectByPage: (params) => API.GET('/operation/v1/order/selectByPage', params),
  // 订单详情
  selectOrderDetails: (params) => API.GET('/operation/v1/order/selectOrderDetails', params),
  // 订单流水
  selectOrderWater: (params) => API.GET('/operation/v1/order/selectOrderWater', params),
  // 退单分页列表
  selectPageRefundOrder: (params) => API.GET('/operation/v1/order/selectPageRefundOrder', params),
  // 订单统计数据
  selectOrderStatic: (params) => API.GET('/operation/v1/order/selectOrderStatic', params)
}

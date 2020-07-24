import * as API from '.';
import * as g from '../libs/global';

export default {
  // 订购记录-分页查询设备绑定列表
  getDeviceActivationQueryByPage: (params) => API.GET(g.config.agentServer + '/agent/v1/deviceActivation/queryByPage', params),
  // 订购记录-解绑设备
  deviceActivationUnBundDevice: (params) => API.POST(g.config.agentServer + '/agent/v1/deviceActivation/unbundDevice', params),
  // 商城-查询商城设备列表
  queryMallDeviceListPage: (params) => API.GET(g.config.agentServer + '/agent/v1/serviceCenter/deviceMall/queryMallDeviceListPage', params),
  // 商城-添加购物车数量
  addShopCart: (params) => API.POST(g.config.agentServer + '/agent/v1/serviceCenter/deviceMall/addShopCart', params),
  // 商城-减少购物车数量
  reduceShopCart: (params) => API.POST(g.config.agentServer + '/agent/v1/serviceCenter/deviceMall/reduceShopCart', params),
  // 商城-指定购物车数量
  setShopCartCount: (params) => API.POST(g.config.agentServer + '/agent/v1/serviceCenter/deviceMall/setShopCartCount', params),
  // 商城-删除购物车
  delShopCart: (params) => API.POST(g.config.agentServer + '/agent/v1/serviceCenter/deviceMall/delShopCart', params),
  // 商城-获取购物车列表
  queryShopCartList: (params) => API.GET(g.config.agentServer + '/agent/v1/serviceCenter/deviceMall/queryShopCartList', params),
  // 商城-结算
  settle: (params) => API.POST(g.config.agentServer + '/agent/v1/serviceCenter/mallOrder/settle', params),
  // 商城-提交订单
  orderSettle: (params) => API.POST(g.config.agentServer + '/agent/v1/serviceCenter/mallOrder/orderSettle', params),
  // 商城-对公转账-提交订单
  companyOrderSettle: (params) => API.POST(g.config.agentServer + '/agent/v1/serviceCenter/mallOrder/companyOrderSettle', params),
  // 商城-查询订购列表
  queryOrderList: (params) => API.GET(g.config.agentServer + '/agent/v1/serviceCenter/mallOrder/queryOrderList', params),
  // 商城-查询订购列表详情
  queryOrderDetail: (params) => API.GET(g.config.agentServer + '/agent/v1/serviceCenter/mallOrder/queryOrderDetail', params),
  // 商城-查询设备详情
  queryMallDeviceDetail: (params) => API.GET(g.config.agentServer + '/agent/v1/serviceCenter/deviceMall/queryMallDeviceDetail', params),
  // 设备管理-库存管理-设备库存-查询所有设备型号/类型
  queryAllDeviceModel: (params) => API.GET('/operation/v1/device/queryAllDeviceModel', params),
  // 查询默认地址
  queryAddress: (params) => API.GET('/operation/v1/postAddress/queryByCondition/agent', params)
};

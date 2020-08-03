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
  queryAddress: (params) => API.GET('/operation/v1/postAddress/queryByCondition/agent', params),
  // 查询模块产品
  selectModuleProduct: (params) => API.GET('/operation/v1/market/selectModuleProduct', params),
  // 顶级服务商服务下单
  createOrder: (params) => API.POST('/operation/v1/market/createOrder', params),
  // 顶级服务商生成自定义的后台等域名
  customDomainGeneration: (params) => API.POST('/operation/v1/market/customDomainGeneration', params),
  // 短信充值记录分页查询
  rechargeRecords: (params) => API.GET('/operation/v1/market/rechargeRecords', params),
  // 保存乐刷通道配置信息
  saveLeShuaConfig: (params) => API.POST('/operation/v1/market/saveLeShuaConfig', params),
  // 保存oem配置信息
  saveOEMConfig: (params) => API.POST('/operation/v1/market/saveOEMConfig', params),
  // 保存新源码配置信息
  saveSourceCodeConfig: (params) => API.POST('/operation/v1/market/saveSourceCodeConfig', params),
  // 查询产品套餐
  selectProductCombo: (params) => API.POST('/operation/v1/market/selectProductCombo', params),
  // 顶级服务商订单查询
  selectTopAgentOrder: (params) => API.GET('/operation/v1/market/selectTopAgentOrder', params)
};

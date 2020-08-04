import * as API from '.';

export default {
  deviceQueryByPage: (params) => API.GET('/operation/v1/device/queryByPage', params), // 设备管理-库存管理-设备库存-分页查询
  deviceAdd: (params) => API.POST('/operation/v1/device/add', params), // 设备管理-库存管理-设备库存-新增设备
  deviceQueryById: (params) => API.GET('/operation/v1/device/queryById', params), // 设备管理-库存管理-设备库存-编辑前的查询
  deviceUpdate: (params) => API.POST('/operation/v1/device/update', params), // 设备管理-库存管理-设备库存-修改设备
  deviceDelete: (params) => API.POST('/operation/v1/device/delete', params), // 设备管理-库存管理-设备库存-删除设备
  queryAllDeviceModel: (params) => API.GET('/operation/v1/device/queryAllDeviceModel', params), // 设备管理-库存管理-设备库存-查询所有设备型号/类型
  finishAllAgent: (params) => API.GET('/operation/v1/deviceOutput/finishAllAgent', params), // 设备库存-订购服务商下拉
  finishAllPrivilegeType: (params) => API.GET('/operation/v1/deviceOutput/finishAllPrivilegeType', params), // 设备库存-订购支付方式下拉
  deviceActivationQueryByPage: (params) => API.GET('/operation/v1/deviceActivation/queryByPage', params), // 设备管理-库存管理-设备授权激活页面-分页列表查询
  deviceActivationUpdate: (params) => API.POST('/operation/v1/deviceActivation/update', params), // 设备管理-库存管理-设备授权激活页面-编辑
  deviceInputQueryByPage: (params) => API.GET('/operation/v1/deviceInput/queryByPage', params), // 设备管理-库存管理-入库管理-分页列表
  deviceInputAdd: (params) => API.POST('/operation/v1/deviceInput/add', params), // 设备管理-库存管理-入库管理-新增入库
  queryInputPage: (params) => API.POST('/operation/v1/deviceDetail/queryInputPage', params), // 设备管理-库存管理-设备明细-入库明细
  queryOutputPage: (params) => API.GET('/operation/v1/deviceDetail/queryOutputPage', params), // 设备管理-库存管理-设备明细-出库明细
  deviceDetailUpdate: (params) => API.POST('/operation/v1/deviceDetail/update', params), // 设备管理-库存管理-设备明细-编辑
  deviceDetailDelete: (params) => API.POST('/operation/v1/deviceDetail/delete', params), // 设备管理-库存管理-入库明细-删除入库
  deviceOutputAdd: (params) => API.POST('/operation/v1/deviceOutput/add', params), // 设备管理-库存管理-出库管理-添加
  deviceOutputQueryByPage: (params) => API.GET('/operation/v1/deviceOutput/queryByPage', params), // 设备管理-库存管理-出库管理-分页查询
  deviceOutputQueryById: (params) => API.GET('/operation/v1/deviceOutput/queryById', params), // 设备管理-库存管理-出库管理-查看详情
  distribute: (params) => API.POST('/operation/v1/deviceOutput/distribute', params), // operation/v1/deviceOutput/distribute
  reject: (params) => API.GET('/operation/v1/deviceOutput/reject', params), // 设备管理-库存管理-出库管理-发货驳回
  finishOutput: (params) => API.POST('/operation/v1/deviceOutput/finishOutput', params), // 设备管理-库存管理-出库管理-完成发货
  finishOutputInfo: (params) => API.GET('/operation/v1/deviceOutput/finishOutputInfo', params), // 设备管理-库存管理-出库管理-查看发货信息
  queryUsing: (params) => API.GET('/operation/v1/deviceData/queryUsing', params), // 设备统计-查询各个设备正在使用的数量
  queryAllProvince: (params) => API.GET('/operation/v1/deviceData/queryAllProvince', params), // 查询所有省份正在使用的数量/查询省份使用排行榜
  queryRegion: (params) => API.GET('/operation/v1/deviceData/queryRegion', params), // 设备统计-查询各个大区设备使用情况
  queryRegionTrade: (params) => API.GET('/operation/v1/deviceData/queryRegionTrade', params), // 设备统计-查询各个大区设备交易情况
  queryMcc: (params) => API.GET('/operation/v1/deviceData/queryMcc', params), // 设备统计-查询各个行业设备使用情况
  queryMccTrade: (params) => API.GET('/operation/v1/deviceData/queryMccTrade', params), // operation/v1/deviceData/queryMccTrade
  queryDetail: (params) => API.GET('/operation/v1/deviceData/queryDetail', params), // 设备统计-设备交易明细统计
  queryProcessLife: (params) => API.GET('/operation/v1/deviceData/queryProcessLife', params), // 设备统计-设备的生命流程
  deviceDataQueryByPage: (params) => API.GET('/operation/v1/deviceData/queryByPage', params), // 设备统计-服务商设备统计
  deviceMerchantQueryByPage: (params) => API.GET('/operation/v1/deviceMerchant/queryByPage', params), // 设备使用列表-分页查询
  unbind: (params) => API.POST('/operation/v1/deviceMerchant/unbind', params), // 设备使用列表-解绑
  unfreeze: (params) => API.POST('/operation/v1/deviceMerchant/unfreeze', params), // 设备使用列表-恢复可用
  deviceMaintainQueryByPage: (params) => API.GET('/operation/v1/deviceMaintain/queryByPage', params), // 设备维修-分页查询
  deviceMaintainQueryById: (params) => API.GET('/operation/v1/deviceMaintain/queryById', params), // 设备维修-通过ID查询
  auditPass: (params) => API.POST('/operation/v1/deviceMaintain/auditPass', params), // 设备维修-待审核通过
  auditReject: (params) => API.POST('/operation/v1/deviceMaintain/auditReject', params), // 设备维修-待审核驳回
  receive: (params) => API.POST('/operation/v1/deviceMaintain/receive', params), // 设备维修-确认收货
  saveMoney: (params) => API.POST('/operation/v1/deviceMaintain/saveMoney', params), // 设备维修-维修完成收款-变更为待发货
  send: (params) => API.POST('/operation/v1/deviceMaintain/send', params), // 设备维修-收款成功之后已发货操作
  deviceMallQueryByPage: (params) => API.GET('/operation/v1/deviceMall/queryByPage', params), // 设备商城管理-分页查询
  deviceMallAdd: (params) => API.POST('/operation/v1/deviceMall/add', params), // 设备商城管理-添加
  selectById: (params) => API.GET('/operation/v1/deviceMall/selectById', params), // 设备商城管理-根据主键查询
  deviceMallUpdate: (params) => API.POST('/operation/v1/deviceMall/update', params), // 设备商城管理-更新
  deviceMallDelete: (params) => API.POST('/operation/v1/deviceMall/delete', params), // 设备商城管理-删除
  on: (params) => API.POST('/operation/v1/deviceMall/on', params), // 设备商城管理-上架
  off: (params) => API.POST('/operation/v1/deviceMall/off', params), // 设备商城管理-下架
  queryAllOperation: () => API.GET('/operation/v1/advertPrivilege/queryAllOperation'), // 查询所有运营人员
  queryAllRegion: () => API.GET('/operation/v1/region/queryAllRegion'), // 参数设置-大区设置-查询所有大区
  deviceStatusAll: () => API.GET('/operation/v1/deviceMaintain/deviceStatusAll'), // 设备维修-运营端-状态下拉
  finishOutputInfoUpdate: (params) => API.GET('/operation/v1/deviceOutput/finishOutputInfoUpdate', params) // 设备-出库管理-发货信息编辑
};

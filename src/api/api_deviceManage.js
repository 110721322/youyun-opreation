import * as API from '.'
// ss: (params) => API.GET('', params),
export default {
  // 查询设备类型列表
  deviceList: () => API.GET('/operation/v1/deviceModel/devicetyps/query'),
  // 新建设备型号
  addDeviceModel: (params) => API.POST('/operation/v1/deviceModel/add', params),
  // 查询设备型号详情
  queryByid: (params) => API.GET('/operation/v1/deviceModel/byid/query', params),
  // 设备型号更新接口
  updateDeviceModel: (params) => API.POST('/operation/v1/deviceModel/update', params),
  // 根据设备类型查找设备型号列表
  queryDevicetype: (params) => API.GET('operation/v1/deviceModel/bydevicetype/query', params),
  // 分页查询设备型号列表
  queryDeviceModelPage: (params) => API.GET('operation/v1/deviceModel/page/query', params),
  // 新增设备
  addDevice: (params) => API.GET('/operation/v1/deviceinfo/add', params),
  // 分页查询设备列表
  queryDeviceList: (params) => API.GET('/operation/v1/deviceinfo/page/query', params),
  // 运营后台批量划拨至服务商
  flowService: (params) => API.POST('/operation/v1/deviceinfo/service/flow', params),
  // 查询设备详情
  deviceDetail: (params) => API.GET('/operation/v1/deviceinfo/bydeviceno/query', params),
  // 运营后台解绑设备
  unbindDevice: (params) => API.POST('/operation/v1/deviceinfo/unbind', params),
  // 运营后台回拨设备
  recallDevice: (params) => API.POST('/operation/v1/deviceinfo/recall', params),
  // 运营后台分页查看设备的操作日志
  queryOperlog: (params) => API.GET('/operation/v1/deviceinfo/operlog/page/query', params)
};

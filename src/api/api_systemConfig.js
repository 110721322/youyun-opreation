import * as API from '.';

export default {
  // 参数设置-大区设置-大区保存
  saveRegion: (params) => API.POST('/operation/v1/region/saveRegion', params),
  // 参数设置-大区设置-大区修改
  update: (params) => API.POST('/operation/v1/region/update', params),
  // 参数设置-大区设置-保存大区省份设置
  saveRegionProvinceSet: (params) => API.POST('/operation/v1/region/saveRegionProvinceSet', params),
  // 参数设置-大区设置-删除大区的某一个省份
  deleteProvince: (params) => API.POST('/operation/v1/region/deleteProvince', params),
  // 参数设置-大区设置-查询大区省份设置
  queryRegionProvince: (params) => API.GET('/operation/v1/region/queryRegionProvince', params),
  queryAllRegion: (params) => API.GET('/operation/v1/region/queryAllRegion', params),
  // 参数设置-标签-服务商标签-添加
  labelAddAgent: (params) => API.POST('/operation/v1/label/add/agent', params),
  // 参数设置-标签-职位标签-添加
  labelAddUser: (params) => API.POST('/operation/v1/label/add/user', params),
  // 参数设置-标签-服务商标签-修改
  labelUpdateAgent: (params) => API.POST('/operation/v1/label/update/agent', params),
  // 参数设置-标签-职位标签-修改
  labelUpdateUser: (params) => API.POST('/operation/v1/label/update/user', params),
  labelDelete: (params) => API.POST('/operation/v1/label/delete', params),
  // 参数设置-标签-删除服务商标签
  labelDeleteAgent: (params) => API.POST('/operation/v1/label/delete/agent', params),
  // 参数设置-标签-删除职位标签
  labelDeleteUser: (params) => API.POST('/operation/v1/label/delete/user', params),
  // 参数设置-标签-删除服务商标签关联关系
  deleteLabelRelateAgent: (params) => API.POST('/operation/v1/label/deleteLabelRelate/agent', params),
  // 参数设置-标签-删除职位标签关联关系
  deleteLabelRelateUser: (params) => API.POST('/operation/v1/label/deleteLabelRelate/user', params),
  // 参数设置-标签-修改服务商关联标签
  updateLabelRelateAgent: (params) => API.POST('/operation/v1/label/updateLabelRelate/agent', params),
  // 参数设置-标签-修改用户关联标签
  updateLabelRelateUser: (params) => API.POST('/operation/v1/label/updateLabelRelate/user', params),
  // 参数设置-标签-查询服务商标签
  labelQueryByConditionAgent: (params) => API.GET('/operation/v1/label/queryByCondition/agent', params),
  // 参数设置-标签-查询用户标签
  labelQueryByConditionUser: (params) => API.GET('/operation/v1/label/queryByCondition/user', params),
  // 参数设置-情绪色-添加
  moodColorAddAgent: (params) => API.POST('/operation/v1/moodColor/add/agent', params),
  // 参数设置-情绪色-修改
  moodColorUpdateAgent: (params) => API.POST('/operation/v1/moodColor/update/agent', params),
  // 参数设置-情绪色-查询
  moodColorQueryByConditionAgent: (params) => API.GET('/operation/v1/moodColor/queryByCondition/agent', params),
  // 参数设置-情绪色-修改情绪色关联
  updateMoodColorRelateAgent: (params) => API.POST('/operation/v1/moodColor/updateMoodColorRelate/agent', params),
  // 系统权限按钮翻页查询
  getSystemButton: (params) => API.GET('/operation/v1/systemButton/queryByPage', params),
  // 获取用户权限模板
  getPermistionTemplate: (params) => API.GET('/operation/v1/systemMenu/queryUserJurisdictionTemplate', params),
  // 获取各个平台审批模板
  getAuditTemplate: (params) => API.GET('/operation/v1/systemMenu/queryUserApprovalJurisdictionTemplate', params),
  // 获取各个平台菜单模板
  getSystemMenuTemplate: (params) => API.GET('/operation/v1/systemMenu/selectMenuTemplate', params),
  // 成员管理-保存用户权限
  saveUserPermission: (params) => API.POST('/operation/v1/systemMenu/saveUserJurisdiction', params),
  // 成员管理-保存用户审批权限
  saveUserAudit: (params) => API.POST('/operation/v1/systemMenu/saveUserApprovalJurisdiction', params),
  // 获取各个平台角色
  getSystemRole: (params) => API.GET('/operation/v1/systemMenu/selectRoleCountBySystem', params),
  // 获取角色权限菜单
  getRolePermission: (params) => API.GET('/operation/v1/systemMenu/selectMenuOfRole', params),
  // 保存角色权限菜单
  saveRolePermission: (params) => API.POST('/operation/v1/systemMenu/saveMenuForRole', params),
  // 获取全部审批模板
  getAllAuditTemplate: (params) => API.GET('/operation/v1/systemMenu/selectApprovalJurisdictionTemplate', params),
  // 职位管理-新增
  addInsert: (params) => API.POST('/operation/v1/position/insert', params),
  // 职位管理-编辑
  updateJob: (params) => API.POST('/operation/v1/position/update', params),
  // 职位管理-删除
  deleteJob: (params) => API.POST('/operation/v1/position/delete', params),
  // 职位管理-查询所有职位
  selectAllJob: () => API.GET('/operation/v1/position/selectAll')
};

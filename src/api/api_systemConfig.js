import * as API from '.';

export default {
  saveRegion: (params) => API.POST('/operation/v1/region/saveRegion', params),
  update: (params) => API.POST('/operation/v1/region/update', params),
  saveRegionProvinceSet: (params) => API.POST('/operation/v1/region/saveRegionProvinceSet', params),
  deleteProvince: (params) => API.POST('/operation/v1/region/deleteProvince', params),
  queryRegionProvince: (params) => API.GET('/operation/v1/region/queryRegionProvince', params),
  queryAllRegion: (params) => API.GET('/operation/v1/region/queryAllRegion', params),
  labelAddAgent: (params) => API.POST('/operation/v1/label/add/agent', params),
  labelAddUser: (params) => API.POST('/operation/v1/label/add/user', params),
  labelUpdateAgent: (params) => API.POST('/operation/v1/label/update/agent', params),
  labelUpdateUser: (params) => API.POST('/operation/v1/label/update/user', params),
  labelDelete: (params) => API.POST('/operation/v1/label/delete', params),
  labelDeleteAgent: (params) => API.POST('/operation/v1/label/delete/agent', params),
  labelDeleteUser: (params) => API.POST('/operation/v1/label/delete/user', params),
  deleteLabelRelateAgent: (params) => API.POST('/operation/v1/label/deleteLabelRelate/agent', params),
  deleteLabelRelateUser: (params) => API.POST('/operation/v1/label/deleteLabelRelate/user', params),
  updateLabelRelateAgent: (params) => API.POST('/operation/v1/label/updateLabelRelate/agent', params),
  updateLabelRelateUser: (params) => API.POST('/operation/v1/label/updateLabelRelate/user', params),
  labelQueryByConditionAgent: (params) => API.GET('/operation/v1/label/queryByCondition/agent', params),
  labelQueryByConditionUser: (params) => API.GET('/operation/v1/label/queryByCondition/user', params),
  moodColorAddAgent: (params) => API.POST('/operation/v1/moodColor/add/agent', params),
  moodColorUpdateAgent: (params) => API.POST('/operation/v1/moodColor/update/agent', params),
  moodColorQueryByConditionAgent: (params) => API.GET('/operation/v1/moodColor/queryByCondition/agent', params),
  updateMoodColorRelateAgent: (params) => API.POST('/operation/v1/moodColor/updateMoodColorRelate/agent', params),
  getSystemMenu: (params) => API.POST('/operation/v1/systemMenu/queryByPage', params),
  /**
   * 系统权限按钮翻页查询
   * @param params
   * @returns {Promise<*>}
   */
  getSystemButton: (params) => API.GET('/operation/v1/systemButton/queryByPage', params),
  /**
   * 获取用户权限模板
   * @param params
   * @returns {Promise<*>}
   */
  getPermistionTemplate: (params) => API.GET('/operation/v1/systemMenu/queryUserJurisdictionTemplate', params),
  /**
   * 获取各个平台审批模板
   * @param params
   * @returns {Promise<*>}
   */
  getAuditTemplate: (params) => API.GET('/operation/v1/systemMenu/queryUserApprovalJurisdictionTemplate', params),
  /**
   * 获取各个平台菜单模板
   * @param params
   * @returns {Promise<*>}
   */
  getSystemMenuTemplate: (params) => API.GET('/operation/v1/systemMenu/selectMenuTemplate', params),
  saveUserPermission: (params) => API.POST('/operation/v1/systemMenu/saveUserJurisdiction', params),
  saveUserAudit: (params) => API.POST('/operation/v1/systemMenu/saveUserApprovalJurisdiction', params),
  /**
   * 获取各个平台角色
   * @param params
   * @returns {Promise<*>}
   */
  getSystemRole: (params) => API.GET('/operation/v1/systemMenu/selectRoleCountBySystem', params),
  /**
   * 获取角色权限菜单
   * @param params
   * @returns {Promise<*>}
   */
  getRolePermission: (params) => API.GET('/operation/v1/systemMenu/selectMenuOfRole', params),
  /**
   * 保存角色权限菜单
   * @param params
   * @returns {Promise<*>}
   */
  saveRolePermission: (params) => API.POST('/operation/v1/systemMenu/saveMenuForRole', params),
  /**
   * 获取全部审批模板
   * @param params
   * @returns {Promise<*>}
   */
  getAllAuditTemplate: (params) => API.GET('/operation/v1/systemMenu/selectApprovalJurisdictionTemplate', params)
};

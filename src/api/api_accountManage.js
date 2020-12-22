import * as API from '.';

export default {
  // 账户列表-分页查询用户列表
  queryEmployeeList: (params) => API.GET('/operation/v1/user/queryEmployeeList', params),
  // 账户列表-查看用户详情
  getUserById: (params) => API.GET('/operation/v1/user/getUserById', params),
  // 账号列表-添加用户
  addUser: (params) => API.POST('/operation/v1/user/addUser', params),
  // 账户列表-编辑账户
  editUser: (params) => API.POST('/operation/v1/user/editUser', params),
  // 账号列表-禁用冻结用户账号
  freezeUser: (params) => API.POST('/operation/v1/user/freezeUser', params),
  // 账号列表-启用账号
  unfreezeUser: (params) => API.POST('/operation/v1/user/unfreezeUser', params),
  // 账号列表-删除账号
  deleteUser: (params) => API.POST('/operation/v1/user/deleteUser', params),
  // 权限管理-查询所有权限列表
  getRoleList: (params) => API.GET('/operation/v1/user/getRoleList', params)
};

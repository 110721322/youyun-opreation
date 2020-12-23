import * as API from '.'

export default {
  // 登录
  login: (params) => API.POST('/common/v1/user/login', params),
  // 退出
  out: (params) => API.POST('/common/v1/user/logout', params),
  // 获取登录菜单
  queryUserVueRouterList: (params) => API.GET('/operation/v1/systemMenu/queryUserVueRouterList', params)

};

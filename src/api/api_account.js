import * as API from '.';
export default {
  // 账户中心
  getLoginUser: (params) => API.GET('/operation/v1/login/getLoginUser', params)
}

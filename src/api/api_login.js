import * as API from '.';

export default {
  login: (params) => API.POST('/operation/v1/login/in', params),
  getSmsCode: (params) => API.POST('/operation/v1/login/getSmsCode', params),
  changePassword: (params) => API.POST('/operation/v1/login/changePassword', params),
  forgetPassword: (params) => API.POST('/operation/v1/login/forgetPassword', params),
  bindWeChat: (params) => API.POST('/operation/v1/login/bindWeChat', params),
  out: (params) => API.POST('/operation/v1/login/out', params),
  perfectUpdate: (params) => API.POST('/operation/v1/employee/perfectUpdate', params)
};

import * as API from '.'
// import api_login from "./devDataModel/api_login";

const api = {
  login: (params) => API.POST('/fund/v1/login/login', params),
  register: (params) => API.POST('/fund/v1/login/register', params),
  out: (params) => API.GET('/fund/v1/login/logon', params)
};

export default api

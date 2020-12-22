import * as API from '.'

export default {
  login: (params) => API.POST('/common/v1/user/login', params),
  out: (params) => API.POST('/common/v1/user/logout', params)
};

import * as API from '.';

export default {
  login: (params) => API.GET('/operation/v1/login/in', params)
};

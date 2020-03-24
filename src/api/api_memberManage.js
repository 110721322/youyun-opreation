import * as API from '.';

export default {
  memberList: (params) => API.POST('/operation/v1/employee/queryEmployeeList', params)
};

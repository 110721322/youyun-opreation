import * as API from '.';

export default {
  queryEmployeeList: (params) => API.POST('/operation/v1/employee/queryEmployeeList', params),
  addMember: (params) => API.POST('/operation/v1/employee/addMember', params),
  fillUserInfo: (params) => API.POST('/operation/v1/employee/fillUserInfo', params),
  employeeOrganization: (params) => API.POST('/operation/v1/employee/employeeOrganization', params),
  employeeDetail: (params) => API.POST('/operation/v1/employee/employeeDetail', params),
  perfectUpdate: (params) => API.POST('/operation/v1/employee/perfectUpdate', params),
  superiorsList: (params) => API.POST('/operation/v1/employee/superiorsList', params),
  assignSuperior: (params) => API.POST('/operation/v1/employee/assignSuperior', params),
  queryUserById: (params) => API.POST('/operation/v1/employee/queryUserById', params),
  saveJobInformation: (params) => API.POST('/operation/v1/employee/saveJobInformation', params),
  subordinateList: (params) => API.POST('/operation/v1/employee/subordinateList', params)
};

import * as API from '.';
import utils from "../libs/kit/utils";
import store from '@/store';
export default {
  queryEmployeeList: (params) => API.POST('/operation/v1/employee/queryEmployeeList', params),
  addMember: (params) => API.POST('/operation/v1/employee/addMember', params),
  delMember: (params) => API.POST('/operation/v1/employee/delete', params),
  fillUserInfo: (params) => API.POST('/operation/v1/employee/update', params),
  employeeOrganization: (params) => API.POST('/operation/v1/employee/employeeOrganization', params),
  employeeDetail: (params) => API.POST('/operation/v1/employee/employeeDetail', params),
  perfectUpdate: (params) => API.POST('/operation/v1/employee/perfectUpdate', params),
  superiorsList: (params) => API.POST('/operation/v1/employee/superiorsList', params),
  /**
   * 获取所有员工列表并存入store
   * @param params
   * @returns {Promise<*>}
   */
  allMemberList: (params) => API.POST('/operation/v1/employee/queryAllEmployeeList', params)
    .then(res => {
      let employeeList = res.object;
      if (utils.isArr(employeeList) && employeeList.length > 0) {
        employeeList = employeeList.map($ele => {
          $ele.label = $ele.jobName || $ele.name || $ele.nickName || $ele.id;
          $ele.value = $ele.id;
          return $ele;
        })
        store.dispatch('setEmployeeList', employeeList)
      }
    }),
  /**
   * 获取所有岗位列表并存入store
   * @param params
   * @returns {Promise<*>}
   */
  jobsList: (params) => API.POST('/operation/v1/employee/getPositionList', params)
    .then(res => {
      let positionList = res.object;
      if (utils.isArr(positionList) && positionList.length > 0) {
        positionList = positionList.map($ele => {
          $ele.label = $ele.positionName;
          $ele.value = $ele.positionId;
          return $ele;
        })
        store.dispatch('setPositionList', positionList)
      }
    }),
  assignSuperior: (params) => API.POST('/operation/v1/employee/assignSuperior', params),
  queryUserById: (params) => API.POST('/operation/v1/employee/queryUserById', params),
  saveJobInformation: (params) => API.POST('/operation/v1/employee/saveJobInformation', params),
  subordinateList: (params) => API.GET('/operation/v1/employee/subordinateList', params)
};

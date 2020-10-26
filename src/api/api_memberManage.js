import * as API from '.';
import utils from "../libs/kit/utils";
import store from '@/store';
export default {
  queryEmployeeList: (params) => API.GET('/operation/v1/employee/queryEmployeeList', params),
  addMember: (params) => API.POST('/operation/v1/employee/addMember', params),
  delMember: (params) => API.POST('/operation/v1/employee/delete', params),
  fillUserInfo: (params) => API.POST('/operation/v1/employee/update', params),
  employeeOrganization: (params) => API.GET('/operation/v1/employee/organizationStructure', params),
  employeeDetail: (params) => API.POST('/operation/v1/employee/employeeDetail', params),
  jobInformation: (params) => API.POST('/operation/v1/employee/jobInformation', params),
  perfectUpdate: (params) => API.POST('/operation/v1/employee/perfectUpdate', params),
  superiorsList: (params) => API.POST('/operation/v1/employee/superiorsList', params).then(res => {
    let superiorList = res.data;
    if (utils.isArr(superiorList) && superiorList.length > 0) {
      superiorList = superiorList.map($ele => {
        return {
          label: $ele.nickName,
          value: $ele.id
        };
      })
      store.dispatch('setSuperiorList', superiorList)
    }
  }),
  /**
   * 获取所有员工列表并存入store
   * @param params
   * @returns {Promise<*>}
   */
  allMemberList: (params) => API.POST('/operation/v1/employee/queryAllEmployeeList', params)
    .then(res => {
      let employeeList = res.data;
      if (utils.isArr(employeeList) && employeeList.length > 0) {
        employeeList = employeeList.map($ele => {
          return {
            label: $ele.jobName || $ele.name || $ele.nickName || $ele.superiorId,
            value: $ele.id
          };
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
      let positionList = res.data;
      if (utils.isArr(positionList) && positionList.length > 0) {
        positionList = positionList.map($ele => {
          return {
            label: $ele.positionName,
            value: $ele.positionId
          };
        })
        store.dispatch('setPositionList', positionList)
      }
    }),
  assignSuperior: (params) => API.POST('/operation/v1/employee/assignSuperior', params),
  queryUserById: (params) => API.POST('/operation/v1/employee/queryUserById', params),
  saveJobInformation: (params) => API.POST('/operation/v1/employee/saveJobInformation', params),
  subordinateList: (params) => API.GET('/operation/v1/employee/subordinateList', params)
};

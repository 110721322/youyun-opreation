import * as API from '.';
import utils from "../libs/kit/utils";
import store from '@/store';

export default {
  // 用户管理-用户列表
  queryEmployeeList: (params) => API.GET('/operation/v1/employee/queryEmployeeList', params),
  // 用户管理-添加成员
  addMember: (params) => API.POST('/operation/v1/employee/addMember', params),
  // 用户管理-删除成员
  delMember: (params) => API.POST('/operation/v1/employee/delete', params),
  // 成员列表-修改个人信息
  fillUserInfo: (params) => API.POST('/operation/v1/employee/update', params),
  // 成员管理-组织架构
  employeeOrganization: (params) => API.GET('/operation/v1/employee/organizationStructure', params),
  // 成员管理-员工详情
  employeeDetail: (params) => API.POST('/operation/v1/employee/employeeDetail', params),
  // 成员管理-岗位信息
  jobInformation: (params) => API.POST('/operation/v1/employee/jobInformation', params),
  // 成员管理-完善个人信息
  perfectUpdate: (params) => API.POST('/operation/v1/employee/perfectUpdate', params),
  // 用户管理-为用户设定上级
  assignSuperior: (params) => API.POST('/operation/v1/employee/assignSuperior', params),
  // 用户管理-查询单个用户
  queryUserById: (params) => API.POST('/operation/v1/employee/queryUserById', params),
  // 用户管理-保存岗位信息
  saveJobInformation: (params) => API.POST('/operation/v1/employee/saveJobInformation', params),
  // 用户管理-下级列表
  subordinateList: (params) => API.GET('/operation/v1/employee/subordinateList', params),
  // 用户管理-上级列表
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
            value: $ele.id,
            roleId: $ele.roleId
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
  jobsList: (params) => API.GET('/operation/v1/position/selectAll', params)
    .then(res => {
      let positionList = res.data;
      if (utils.isArr(positionList) && positionList.length > 0) {
        positionList = positionList.map($ele => {
          return {
            label: $ele.name,
            value: $ele.id
          };
        })
        store.dispatch('setPositionList', positionList)
      }
    })
};

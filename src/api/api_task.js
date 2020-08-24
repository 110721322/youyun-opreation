import * as API from '.';

export default {
  // 成员效率-工作任务统计列表
  statisticsList: (params) => API.GET('/operation/v1/workbench/task/selectTaskStatisticsList', params),
  // 查询成员列表下拉框
  queryAllEmployeeList: () => API.POST('/operation/v1/employee/queryAllEmployeeList'),
  // 查询所有待办事项类型
  queryTaskType: () => API.GET('/operation/v1/workbench/taskType/queryAllTaskTypeList'),
  // 成员效率-查询某个状态下的待办事项类型统计列表
  queryTaskList: (params) => API.GET('/operation/v1/workbench/task/queryOperationAllTaskMenu', params),
  // 成员效率-分页查询具体某个状态下的某个任务类型列表
  queryOperationTaskList: (params) => API.GET('/operation/v1/workbench/task/queryOperationTaskList', params)
};

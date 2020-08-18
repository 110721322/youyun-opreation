import * as API from '.';

export default {
  // 待办事项-查询某个状态下的待办事项类型统计列表
  queryAllTaskMenu: (params) => API.GET('/operation/v1/workbench/task/queryAllTaskMenu', params),
  // 待办事项-分页查询具体某个状态下的某个任务类型列表
  queryTaskList: (params) => API.GET('/operation/v1/workbench/task/queryTaskList', params),
  // 待办事项-所有的待办事项任务类型
  queryAllList: (params) => API.GET('/operation/v1/workbench/taskType/queryAllTaskTypeList', params),
  // 待办事项-批量插入或单个插入沟通小记
  insertTalkPlan: (params) => API.GET('/operation/v1/workbench/task/insertTalkPlan', params),
  // 待办事项-查询所有问题商户或服务商下拉列表
  queryAllProblemMerchantOrAgent: (params) => API.GET('/operation/v1/workbench/task/queryAllProblemMerchantOrAgent', params)
};

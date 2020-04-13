import * as API from '.';

export default {
  queryAllTaskMenu: (params) => API.GET('/operation/v1/workbench/task/queryAllTaskMenu', params),
  queryTaskList: (params) => API.GET('/operation/v1/workbench/task/queryTaskList', params),
  queryAllTaskTypeList: (params) => API.GET('/operation/v1/workbench/taskType/queryAllTaskTypeList', params),
  insertTalkPlan: (params) => API.GET('/operation/v1/workbench/task/insertTalkPlan', params),
  queryAllProblemMerchantOrAgent: (params) => API.GET('/operation/v1/workbench/task/queryAllProblemMerchantOrAgent', params)
};

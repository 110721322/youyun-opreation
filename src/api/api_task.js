import * as API from '.';

export default {
  queryOperationAllTaskMenu: (params) => API.GET('/operation/v1/workbench/task/queryOperationAllTaskMenu', params),
  queryOperationTaskList: (params) => API.GET('/operation/v1/workbench/task/queryOperationTaskList', params)
};

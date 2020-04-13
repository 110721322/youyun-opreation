import * as API from '.';

export default {
  workerOrderStatisticQueryByPage: (params) => API.POST('/operation/v1/workerOrderStatistic/queryByPage', params),
  workerOrderQueryByPage: (params) => API.POST('/operation/v1/workerOrder/queryByPage', params),
  add: (params) => API.POST('/operation/v1/workerOrder/add', params),
  detail: (params) => API.POST('/operation/v1/workerOrder/detail', params),
  designate: (params) => API.POST('/operation/v1/workerOrder/designate', params),
  reply: (params) => API.POST('/operation/v1/workerOrder/reply', params),
  evaluate: (params) => API.POST('/operation/v1/workerOrder/evaluate', params),
  update: (params) => API.POST('/operation/v1/workerOrder/update', params),
  addFirstClass: (params) => API.POST('/operation/v1/workerQuestion/addFirstClass', params),
  updateFirstClass: (params) => API.POST('/operation/v1/workerQuestion/updateFirstClass', params),
  queryFirstClassByPage: (params) => API.POST('/operation/v1/workerQuestion/queryFirstClassByPage', params),
  moveFirstMenu: (params) => API.POST('/operation/v1/workerQuestion/moveFirstMenu', params),
  addSecondClass: (params) => API.POST('/operation/v1/workerQuestion/addSecondClass', params),
  moveSecondMenu: (params) => API.POST('/operation/v1/workerQuestion/moveSecondMenu', params),
  updateSecondClass: (params) => API.POST('/operation/v1/workerQuestion/updateSecondClass', params),
  querySecondClassByPage: (params) => API.POST('/operation/v1/workerQuestion/querySecondClassByPage', params),
  addQuestion: (params) => API.POST('/operation/v1/workerQuestion/addQuestion', params),
  updateQuestion: (params) => API.POST('/operation/v1/workerQuestion/updateQuestion', params),
  queryQuestionByPage: (params) => API.POST('/operation/v1/workerQuestion/queryQuestionByPage', params)
};

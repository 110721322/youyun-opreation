import * as API from '.';
export default {
  // 统计列表-根据条件查询工单统计列表
  workerOrderStatisticQueryByPage: (params) => API.POST('/operation/v1/workerOrderStatistic/queryByPage', params),
  // 工单管理-工单列表
  workerOrderQueryByPage: (params) => API.GET('/operation/v1/workerOrder/queryByPage', params),
  // 工单管理-新增工单
  add: (params) => API.POST('/operation/v1/workerOrder/add', params),
  // 工单管理-工单详情/查看回复
  detail: (params) => API.POST('/operation/v1/workerOrder/detail', params, {changeContent: true}),
  // 工单管理-指定处理人员
  designate: (params) => API.POST('/operation/v1/workerOrder/designate', params),
  // 工单管理-回复
  reply: (params) => API.POST('/operation/v1/workerOrder/reply', params),
  // 工单管理-评价
  evaluate: (params) => API.POST('/operation/v1/workerOrder/evaluate', params),
  // 工单管理-编辑工单
  update: (params) => API.POST('/operation/v1/workerOrder/update', params),
  // 工单知识库-新增一级类目
  addFirstClass: (params) => API.POST('/operation/v1/workerQuestion/addFirstClass', params, {changeContent: true}),
  // 工单知识库-修改/删除一级类目
  updateFirstClass: (params) => API.POST('/operation/v1/workerQuestion/updateFirstClass', params),
  // 工单知识库-一级类目列表
  queryFirstClassByPage: (params) => API.GET('/operation/v1/workerQuestion/queryFirstClassByPage', params),
  // 工单知识库-移动一级类目
  moveFirstMenu: (params) => API.POST('/operation/v1/workerQuestion/moveFirstMenu', params),
  // 工单知识库-新增二级类目
  addSecondClass: (params) => API.POST('/operation/v1/workerQuestion/addSecondClass', params),
  // 工单知识库-移动二级类目
  moveSecondMenu: (params) => API.POST('/operation/v1/workerQuestion/moveSecondMenu', params),
  // 工单知识库-修改/删除二级类目
  updateSecondClass: (params) => API.POST('/operation/v1/workerQuestion/updateSecondClass', params),
  // 工单知识库-二级类目列表
  querySecondClassByPage: (params) => API.GET('/operation/v1/workerQuestion/querySecondClassByPage', params),
  // 工单知识库-新增问题
  addQuestion: (params) => API.POST('/operation/v1/workerQuestion/addQuestion', params),
  // 工单知识库-编辑问题/删除问题
  updateQuestion: (params) => API.POST('/operation/v1/workerQuestion/updateQuestion', params),
  // 工单知识库-查询问题列表
  queryQuestionByPage: (params) => API.GET('/operation/v1/workerQuestion/queryQuestionByPage', params),
  deleteFirstClass: (params) => API.POST('/operation/v1/workerQuestion/deleteFirstClass', params, {changeContent: true}),
  deleteSecondClass: (params) => API.POST('/operation/v1/workerQuestion/deleteSecondClass', params, {changeContent: true}),
  deleteQuestion: (params) => API.POST('/operation/v1/workerQuestion/deleteQuestion', params)
};

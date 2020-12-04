import * as API from '.';

export default {
  // 待办事项- 详情
  details: (params) => API.GET('/operation/v1/system/params/backlog/details', params),
  // 待办事项-更新
  update: (params) => API.POST('/operation/v1/system/params/backlog/update', params),
  // 自定义表单-按字段分类查找所有的自定义字段
  queryAllFormFieldsByType: (params) => API.GET('/operation/v1/formCustom/queryAllFormFieldsByType', params),
  // 自定义表单-批量设置或单个设置自定义字段
  batchSetFormFieldsProperty: (params) => API.POST('/operation/v1/formCustom/batchSetFormFieldsProperty', params)
};

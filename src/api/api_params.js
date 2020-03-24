import * as API from '.';

export default {
  details: (params) => API.GET('/operation/v1/system/params/backlog/details', params),
  update: (params) => API.POST('/operation/v1/system/params/backlog/update', params),
  queryAllFormFieldsByType: (params) => API.GET('/operation/v1/formCustom/queryAllFormFieldsByType', params),
  batchSetFormFieldsProperty: (params) => API.POST('/operation/v1/formCustom/batchSetFormFieldsProperty', params)
};

import * as API from '.';

export default {
  saveRegion: (params) => API.POST('/operation/v1/region/saveRegion', params),
  update: (params) => API.POST('/operation/v1/region/update', params),
  saveRegionProvinceSet: (params) => API.POST('/operation/v1/region/saveRegionProvinceSet', params),
  deleteProvince: (params) => API.POST('/operation/v1/region/deleteProvince', params),
  queryRegionProvince: (params) => API.GET('/operation/v1/region/queryRegionProvince', params),
  queryAllRegion: (params) => API.GET('/operation/v1/region/queryAllRegion', params),
  labelAddAgent: (params) => API.POST('/operation/v1/label/add/agent', params),
  labelAddUser: (params) => API.POST('/operation/v1/label/add/user', params),
  labelUpdateAgent: (params) => API.POST('/operation/v1/label/update/agent', params),
  labelUpdateUser: (params) => API.POST('/operation/v1/label/update/user', params),
  labelDeleteAgent: (params) => API.POST('/operation/v1/label/delete/agent', params),
  labelDeleteUser: (params) => API.POST('/operation/v1/label/delete/user', params),
  deleteLabelRelateAgent: (params) => API.POST('/operation/v1/label/deleteLabelRelate/agent', params),
  deleteLabelRelateUser: (params) => API.POST('/operation/v1/label/deleteLabelRelate/user', params),
  updateLabelRelateAgent: (params) => API.POST('/operation/v1/label/updateLabelRelate/agent', params),
  updateLabelRelateUser: (params) => API.POST('/operation/v1/label/updateLabelRelate/user', params),
  labelQueryByConditionAgent: (params) => API.GET('/operation/v1/label/queryByCondition/agent', params),
  labelQueryByConditionUser: (params) => API.GET('/operation/v1/label/queryByCondition/user', params),
  moodColorAddAgent: (params) => API.POST('/operation/v1/moodColor/add/agent', params),
  moodColorUpdateAgent: (params) => API.POST('/operation/v1/moodColor/update/agent', params),
  moodColorQueryByConditionAgent: (params) => API.GET('/operation/v1/moodColor/queryByCondition/agent', params),
  updateMoodColorRelateAgent: (params) => API.POST('/operation/v1/moodColor/updateMoodColorRelate/agent', params)
};

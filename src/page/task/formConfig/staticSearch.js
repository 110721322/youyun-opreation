import api from "@/api/api_task"
export const FORM_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      datatype: 'datetimerange',
      class: 'max-width',
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '成员',
      key: 'recevierId',
      style: 'width:294px',
      labelWidth: '100px',
      urlOptions: {
        url: api.queryAllEmployeeList,
        method: 'post',
        keyName: 'id',
        valueName: 'name'
      }
    }
  ]
}

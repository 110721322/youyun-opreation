import api from "@/api/api_task"
export const FORM_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      datatype: 'datetimerange',
      class: 'max-width',
      labelWidth: '80px',
      span: 20
    },
    {
      type: 1,
      label: '成员',
      key: 'recevierId',
      labelWidth: '50px',
      span: 15,
      urlOptions: {
        url: api.queryAllEmployeeList,
        method: 'post',
        keyName: 'id',
        valueName: 'name'
      }
    }
  ]
}

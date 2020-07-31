import store from "@/store";
export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      format: "yyyy-MM-dd HH:mm:ss",
      datatype: "datetimerange",
      class: 'max-width',
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '成员',
      key: 'operatorId',
      style: 'width:294px',
      options: store.state.system.employeeList
    }
  ]
}

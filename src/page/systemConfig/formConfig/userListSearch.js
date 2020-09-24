export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      querySelectAll: true,
      timeType: 'datetimerange',
      isSelectToday: true,
      label: '筛选时间',
      key: 'date',
      labelWidth: '80px',
      span: 22
    },
    {
      type: 10,
      label: '精准筛选',
      key: 'inputForm',
      labelWidth: '80px',
      span: 22,
      options: [
        {
          label: '工号',
          value: 'jobNumber'
        },
        {
          label: '成员花名',
          value: 'jobName'
        },
        {
          label: '成员姓名',
          value: 'name'
        },
        {
          label: '手机号',
          value: 'phone'
        }
      ]
    },
    {
      type: 1,
      label: '性别',
      key: 'sex',
      labelWidth: '80px',
      span: 11,
      options: [
        {
          label: '保密',
          value: null
        },
        {
          label: '女',
          value: 0
        },
        {
          label: '男',
          value: 1
        }
      ]
    }
  ]
}

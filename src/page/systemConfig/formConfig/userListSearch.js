export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      timeType: 'datetimerange',
      isSelectToday: true,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '100px'
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
      class: 'max-width',
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
      ],
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '性别',
      key: 'sex',
      style: 'width:294px',
      labelWidth: '100px',
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

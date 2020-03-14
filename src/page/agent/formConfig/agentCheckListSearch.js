export const FORM_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '100px'
    },
    {
      type: 0,
      label: '公司名称',
      key: 'companyName',
      style: 'width:294px',
      labelWidth: '100px'
    },
    {
      type: 0,
      label: '法人姓名',
      key: 'lawName',
      style: 'width:294px',
      labelWidth: '185px'
    },
    {
      type: 0,
      label: '法人手机号',
      key: 'phone',
      style: 'width:294px',
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '服务商类型',
      key: 'type',
      style: 'width:294px',
      labelWidth: '185px',
      options: [
        {
          label: '川菜',
          value: 0
        },
        {
          label: '粤菜',
          value: 1
        },
        {
          label: '杭帮菜',
          value: 2
        }
      ]
    },
    {
      type: 1,
      label: '状态',
      key: 'status',
      style: 'width:294px',
      labelWidth: '100px',
      options: [
        {
          label: '川菜',
          value: 0
        },
        {
          label: '粤菜',
          value: 1
        },
        {
          label: '杭帮菜',
          value: 2
        }
      ]
    }
  ]
}

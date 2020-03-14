export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '设备型号',
      key: 'type',
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
    },
    {
      type: 0,
      label: '设备标识',
      key: 'Identity',
      style: 'width:294px',
      labelWidth: '185px'
    },
    {
      type: 0,
      label: '所属商户',
      key: 'merchantProvider',
      style: 'width:294px'
    },
    {
      type: 0,
      label: '所属服务商',
      key: 'serviceProvider',
      style: 'width:294px',
      labelWidth: '185px'
    },
    {
      type: 1,
      label: '设备状态',
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

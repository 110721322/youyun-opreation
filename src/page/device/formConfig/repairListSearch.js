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
      label: '设备名称',
      key: 'name',
      style: 'width:294px',
      labelWidth: '110px',
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
      label: '单号',
      key: 'order',
      style: 'width:294px',
      labelWidth: '110px'
    },
    {
      type: 0,
      label: '所属服务商ID',
      key: 'serviceProviderId',
      style: 'width:294px',
      labelWidth: '110px'
    },
    {
      type: 0,
      label: '所属服务商',
      key: 'serviceProvider',
      style: 'width:294px',
      labelWidth: '110px'
    },
    {
      type: 1,
      label: '状态',
      key: 'status',
      style: 'width:294px',
      labelWidth: '110px',
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
      label: '所属运营',
      key: 'oper',
      style: 'width:294px',
      labelWidth: '110px',
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

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
      type: 10,
      label: '精准筛选',
      key: '',
      class: 'max-width',
      options: [
        {
          label: '服务商ID',
          value: 'agentNo'
        },
        {
          label: '服务商名称',
          value: 'agentName'
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '支付方式',
      key: 'payType',
      style: 'width:294px',
      labelWidth: '100px',
      options: [
        {
          label: '全部',
          value: 0
        },
        // {
        //   label: '支付宝',
        //   value: 1
        // },
        // {
        //   label: '微信',
        //   value: 2
        // },
        // {
        //   label: '云闪付',
        //   value: 3
        // },
        {
          label: '对公转账',
          value: 4
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
          label: '全部',
          value: 0
        },
        {
          label: '已完成',
          value: 2
        },
        {
          label: '财务审核中',
          value: 1
        },
        {
          label: '财务驳回',
          value: 3
        }
      ]
    }
  ]
}

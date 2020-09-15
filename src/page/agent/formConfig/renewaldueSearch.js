export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      format: "yyyy-MM-dd HH:mm:ss",
      datatype: "datetimerange",
      class: 'max-width',
      labelWidth: '80px',
      span: 20
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
      labelWidth: '80px',
      span: 11
    },
    {
      type: 1,
      label: '支付方式',
      key: 'payType',
      labelWidth: '80px',
      span: 11,
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
      labelWidth: '80px',
      span: 11,
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

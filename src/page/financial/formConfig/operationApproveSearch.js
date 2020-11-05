export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      selectSevenDay: true,
      labelWidth: '80px',
      span: 22
    },
    // {
    //   type: 10,
    //   label: '精准筛选',
    //   key: '',
    //   options: [
    //     {
    //       label: '服务商ID',
    //       value: 'agentNo'
    //     },
    //     {
    //       label: '服务商名称',
    //       value: 'agentName'
    //     }
    //   ],
    //   class: 'max-width',
    //   labelWidth: '80px',
    //   span: 22
    // },
    {
      type: 1,
      label: '审核状态',
      key: 'settleStatus',
      labelWidth: '80px',
      span: 11,
      options: [
        {
          label: '已结算',
          value: 1
        },
        {
          label: '结算中',
          value: 2
        },
        {
          label: '未结算',
          value: 3
        },
        {
          label: '驳回',
          value: 4
        },
        {
          label: '运营审核中',
          value: 21
        },
        {
          label: '财务审核中',
          value: 22
        },
        {
          label: '运营驳回',
          value: 41
        },
        {
          label: '财务驳回',
          value: 42
        },
        {
          label: '运营审核通过',
          value: 61
        },
        {
          label: '财务审核通过',
          value: 62
        }
      ]
    }
  ]
}

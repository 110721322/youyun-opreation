export const SEARCH_FORM_CONFIG = {
  formData: [
    {
      type: 0,
      label: '结算ID',
      key: 'settleNo',
      labelWidth: '128px',
      span: 11
    },
    {
      type: 0,
      label: '服务商',
      key: 'agentName',
      labelWidth: '128px',
      span: 11
    },
    {
      type: 9,
      label: '结算时间',
      key: 'date',
      isHiddenBtn: true,
      labelWidth: '128px',
      span: 11
    },
    {
      type: 1,
      label: '处理状态',
      key: 'settleStatus',
      labelWidth: '128px',
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
        }
      ],
      span: 11
    }
  ]
}
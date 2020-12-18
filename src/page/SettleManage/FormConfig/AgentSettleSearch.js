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
      type: 11,
      label: '结算时间',
      key: 'date',
      datatype: 'daterange',
      format: 'yyyy-MM-dd',
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
          label: '待处理',
          value: 0
        },
        {
          label: '已处理',
          value: 1
        },
        {
          label: '驳回',
          value: 2
        }
      ],
      span: 11
    }
  ]
}
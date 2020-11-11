export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '创建时间',
      key: 'date',
      isSelectToday: true,
      querySelectAll: true,
      labelWidth: '80px',
      class: 'max-width',
      span: 24
    },
    {
      type: 1,
      key: 'settleStatus',
      label: '结算状态',
      labelWidth: '80px',
      span: 11,
      options: [
        {
          label: '全部',
          value: ''
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

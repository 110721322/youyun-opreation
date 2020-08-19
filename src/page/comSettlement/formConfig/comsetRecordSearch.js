export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '创建时间',
      key: 'date',
      datatype: 'datetimerange',
      labelWidth: '100px',
      class: 'max-width'
    },
    {
      type: 1,
      key: 'settleStatus',
      label: '结算状态',
      options: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '未结算',
          value: 3
        },
        {
          label: '已结算',
          value: 1
        },
        {
          label: '结算中',
          value: 2
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
          label: '全部',
          value: 0
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

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 11,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '100px',
      style: 'width:294px',
      options: [
        {
          label: '待审核',
          value: 0
        }
      ]
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
      class: 'max-width',
      options: [
        {
          label: '服务商ID',
          value: 'merchantNo'
        },
        {
          label: '服务商名称',
          value: 'merchantName'
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '结算状态',
      key: 'status',
      style: 'width:294px',
      options: [
        {
          label: '待审核',
          value: 0
        },
        {
          label: '审核通过',
          value: 1
        },
        {
          label: '驳回',
          value: 2
        }
      ]
    }
  ]
}

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
      label: '审核状态',
      key: 'settleStatus',
      style: 'width:294px',
      labelWidth: '100px',
      options: [
        {
          label: '完成',
          value: 'success'
        },
        {
          label: '审核中',
          value: 'audit'
        },
        {
          label: '驳回',
          value: 'reject'
        }
      ]
    }
  ]
}

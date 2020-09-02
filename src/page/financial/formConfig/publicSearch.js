export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      datatype: 'datetimerange',
      format: 'yyyy-MM-dd HH:mm:ss',
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
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '审核状态',
      key: 'auditStatus',
      style: 'width:294px',
      labelWidth: '100px',
      options: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '待审核',
          value: 0
        },
        {
          label: '审核通过',
          value: 1
        },
        {
          label: '审核驳回',
          value: 2
        }
      ]
    }
  ]
}

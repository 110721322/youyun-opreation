export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      datatype: 'datetimerange',
      format: 'yyyy-MM-dd HH:mm:ss',
      labelWidth: '80px',
      span: 20
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
      options: [
        {
          label: '服务商ID',
          value: 'agentNo'
        }
      ],
      labelWidth: '80px',
      span: 11
    },
    {
      type: 1,
      label: '审核状态',
      key: 'auditStatus',
      labelWidth: '80px',
      span: 11,
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

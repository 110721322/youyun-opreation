export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
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
        },
        {
          label: '服务商名称',
          value: 'agentName'
        }
      ],
      labelWidth: '80px',
      span: 11
    }
  ]
}

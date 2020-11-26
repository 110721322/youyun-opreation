export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      defaultDateType: 'all',
      labelWidth: '90px',
      span: 22
    },
    {
      type: 10,
      label: '筛选',
      key: 'search',
      options: [
        {
          label: '服务商名称',
          value: 'agentName'
        },
        {
          label: '服务商ID',
          value: 'agentNo'
        }
      ],
      labelWidth: '90px',
      span: 22
    }
  ]
}

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      querySelectAll: true,
      isSelectToday: true,
      labelWidth: '90px',
      span: 22
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
      labelWidth: '90px',
      span: 22
    }
  ]
}

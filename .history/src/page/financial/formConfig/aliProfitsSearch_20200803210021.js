export const SEARCH_CONFIG = {
  formData: [
    {
      type: 11,
      label: '筛选时间',
      key: 'date',
      datatype: 'date',
      class: 'max-width',
      labelWidth: '100px',
      format: 'yyyy-MM-dd'
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
    }
  ]
}

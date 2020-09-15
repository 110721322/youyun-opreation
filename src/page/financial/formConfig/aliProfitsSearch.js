export const SEARCH_CONFIG = {
  formData: [
    {
      type: 11,
      label: '筛选时间',
      key: 'date',
      datatype: 'date',
      class: 'max-width',
      labelWidth: '80px',
      span: 20,
      format: 'yyyy-MM-dd HH:mm:ss'
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
      options: [
        {
          label: '商户ID',
          value: 'agentNo'
        },
        {
          label: '商户名称',
          value: 'agentName'
        }
      ],
      labelWidth: '80px',
      span: 11
    }
  ]
}

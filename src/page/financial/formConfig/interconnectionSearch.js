export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '精准筛选',
      key: 'date',
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
    }
  ]
}

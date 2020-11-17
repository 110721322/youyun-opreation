export const SEARCH_CONFIG = {
  formData: [
    {
      type: 10,
      label: '筛选',
      key: 'search',
      class: 'max-width',
      options: [
        {
          label: '商户名称',
          value: 'merchantName'
        },
        {
          label: '商户ID',
          value: 'merchantNo'
        }
      ],
      labelWidth: '80px',
      span: 22
    }
  ]
}

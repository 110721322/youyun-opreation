export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '创建时间',
      key: 'date',
      labelWidth: '100px',
      class: 'max-width'
    },
    {
      type: 1,
      key: 'status',
      label: '结算状态',
      options: [
        {
          label: '未结算',
          value: '1'
        }
      ]
    }
  ]
}

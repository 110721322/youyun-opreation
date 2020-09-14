export const SEARCH_CONFIG = {
  formData: [
    {
      type: 11,
      label: '筛选时间',
      key: 'date',
      labelWidth: '80px',
      span: 20,
      datatype: 'month',
      format: 'yyyy-MM'
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
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
      labelWidth: '80px',
      span: 11
    }
  ]
}

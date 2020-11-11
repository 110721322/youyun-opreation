export const SEARCH_CONFIG = {
  formData: [
    {
      type: 10,
      label: '筛选',
      key: 'search',
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
      span: 22
    },
    {
      type: 11,
      label: '筛选时间',
      key: 'date',
      labelWidth: '80px',
      span: 22,
      datatype: 'month',
      format: 'yyyy-MM'
    }
  ]
}

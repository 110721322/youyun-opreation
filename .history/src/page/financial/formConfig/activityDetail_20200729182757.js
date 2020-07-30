export const SEARCH_CONFIG = {
  formData: [
    {
      type: 11,
      label: '奖励核算时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '110px',
      datatype: 'month',
      format: 'yyyy-MM-dd'
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
      class: 'max-width',
      options: [
        {
          label: '商户编号',
          value: 'merchantNo'
        },
        {
          label: '商户名',
          value: 'merchantName'
        }
      ],
      labelWidth: '110px'
    }
  ]
}

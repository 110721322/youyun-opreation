export const FORM_CONFIG = {
  formData: [
    {
      type: 11,
      label: '选择月份',
      key: 'date',
      datatype: 'month',
      placeholder: '选择月份',
      format: 'yyyy-MM',
      class: 'max-width',
      labelWidth: '80px',
      span: 22
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
      labelWidth: '80px',
      span: 22
    }
  ]
}

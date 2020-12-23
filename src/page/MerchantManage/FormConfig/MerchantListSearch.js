export const SEARCH_FORM_CONFIG = {
  formData: [
    {
      type: 0,
      label: '商户ID',
      key: 'merchantNo',
      labelWidth: '128px',
      span: 11
    },
    {
      type: 0,
      label: '商户名称',
      key: 'merchantName',
      labelWidth: '128px',
      span: 11
    },
    {
      type: 0,
      label: '所属服务商',
      key: 'agentName',
      labelWidth: '128px',
      span: 11
    },
    {
      type: 1,
      label: '商户状态',
      key: 'isDisabled',
      labelWidth: '128px',
      options: [
        {
          label: '禁用',
          value: 1
        },
        {
          label: '启用',
          value: 0
        }
      ],
      span: 11
    }
  ]
}
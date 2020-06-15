export const FORM_CONFIG = {
  formData: [
    {
      type: 0,
      label: '服务商名称/ID',
      key: 'ID',
      labelWidth: '140px',
      placeholder: '请输入'
    },
    {
      type: 9,
      label: '创建时间',
      key: 'data',
      class: 'max-width',
      labelWidth: '100px'
    },
    {
      type: 0,
      label: '法人姓名',
      key: 'people',
      style: 'width:294px'
    },
    {
      type: 0,
      label: '法人电话',
      key: 'mobile',
      style: 'width:294px'
    },
    {
      type: 1,
      label: '状态',
      key: 'contractStatus',
      style: 'width:294px',
      labelWidth: '185px',
      options: [
        {
          label: '待部署',
          value: 0
        },
        {
          label: '部署中',
          value: 1
        },
        {
          label: '已完成',
          value: 2
        }
      ]
    }
  ]
}

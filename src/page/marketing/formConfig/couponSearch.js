export const FORM_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '100px'
    },
    {
      type: 0,
      label: '优惠码名称',
      key: 'couponName',
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '状态',
      key: 'contractStatus',
      style: 'width:294px',
      labelWidth: '185px',
      options: [
        {
          label: '进行中',
          value: 0
        },
        {
          label: '已结束',
          value: 1
        }
      ]
    }
  ]
}

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '80px',
      span: 22
    },
    {
      type: 10,
      label: '精准筛选',
      key: 'search',
      class: 'max-width',
      options: [
        {
          label: '订单号',
          value: 'id'
        },
        {
          label: '购买服务商',
          value: 'name'
        }
      ],
      labelWidth: '80px',
      span: 22
    },
    {
      type: 1,
      label: '订单类型',
      key: 'type',
      labelWidth: '80px',
      span: 11,
      options: [
        {
          label: '待审核',
          value: 0
        },
        {
          label: '审核通过',
          value: 1
        },
        {
          label: '驳回',
          value: 2
        }
      ]
    },
    {
      type: 1,
      label: '订单状态',
      key: 'status',
      labelWidth: '80px',
      span: 11,
      options: [
        {
          label: '川菜',
          value: 0
        },
        {
          label: '粤菜',
          value: 1
        },
        {
          label: '杭帮菜',
          value: 2
        }
      ]
    }]
}

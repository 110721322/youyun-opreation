export const FORM_CONFIG = {
  formData: [
    {
      type: 10,
      label: '精准筛选',
      key: '',
      class: 'max-width',
      placeholder: "请输入订单号",
      options: [
        {
          label: '订单号',
          value: 'merchantNo'
        },
        {
          label: '商户名称',
          value: 'merchantName'
        },
        {
          label: '所属服务商名称',
          value: 'agentName'
        },
        {
          label: '乐刷商户号',
          value: 'leShuaMerchantNo'
        },
        {
          label: '新大陆商户号',
          value: 'newlandMerchantNo'
        }
      ],
      labelWidth: '80px',
      span: 24
    },
    {
      type: 9,
      label: '创建时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '80px',
      span: 11,
      isSelectToday: true
    },
    {
      type: 0,
      label: '联系人',
      key: 'callUser',
      class: 'min-width',
      labelWidth: '80px',
      span: 11
    },
    {
      type: 0,
      label: '联系电话',
      key: 'callUser',
      class: 'min-width',
      labelWidth: '80px',
      span: 11
    },
    {
      type: 0,
      label: '联系电话',
      key: 'callMobile',
      class: 'min-width',
      labelWidth: '80px',
      span: 11
    },
    {
      type: 1,
      label: '订单状态',
      key: 'orderStatus',
      class: 'min-width',
      labelWidth: '80px',
      span: 11,
      options: [
        {
          label: '待支付',
          value: 0
        },
        {
          label: '已支付',
          value: 1
        },
        {
          label: '已完成',
          value: 2
        },
        {
          label: '已取消',
          value: 3
        },
        {
          label: '支付失败',
          value: 4
        }
      ]
    }
  ]
}

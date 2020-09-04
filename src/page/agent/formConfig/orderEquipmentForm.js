export const ORDER_EQUIPMENT = {
  title: '订购信息',
  formData: [
    {
      type: 0,
      label: '营销人员',
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '设备型号',
      labelWidth: '100px'
    },
    {
      type: 0,
      label: '订购数量',
      labelWidth: '100px'
    },
    {
      type: 0,
      label: '订单金额',
      labelWidth: '100px'
    },
    {
      type: 0,
      label: '实付金额',
      labelWidth: '100px'
    },
    {
      type: 0,
      label: '购买服务商',
      key: '',
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '支付方式',
      key: 'type',
      style: 'width:294px',
      options: [
        {
          label: '微信',
          value: 0
        },
        {
          label: '支付宝',
          value: 1
        },
        {
          label: '刷卡',
          value: 2
        },
        {
          label: '对公转账',
          value: 3
        }
      ]
    },
    {
      type: 1,
      label: '打款凭证',
      key: 'status',
      style: 'width:294px',
      labelWidth: '185px'
    },
    {
      type: 1,
      label: '邮寄地址',
      key: 'status',
      style: 'width:294px',
      labelWidth: '185px'
    },
    {
      type: 1,
      label: '备注',
      key: 'status',
      style: 'width:294px',
      labelWidth: '185px'
    }
  ]
}

export const SERVICE_CONFIG = {
  gridConfig: [
    {
      label: '商家',
      prop: [{key: 'merchantName'}, {key: 'merchantNo', label: 'ID:' }],
      width: '90px'
    },
    {
      label: '总交易金额',
      prop: 'tradeAmount',
      width: '90px'
    },
    {
      label: '总分润',
      prop: 'totalCommission',
      width: '90px'
    },
    {
      label: '支付宝',
      prop: 'alipayIndirectCommission',
      width: '90px'
    },
    {
      label: '微信',
      prop: 'wechatIndirectCommission',
      width: '90px'
    },
    {
      label: '云闪付',
      prop: 'cloudPayCommission',
      width: '90px'
    },
    {
      label: '支付宝',
      prop: 'alipayDirectCommission',
      width: '90px'
    },
    {
      label: '微信',
      prop: 'wechatDirectCommission',
      width: '90px'
    },
    {
      label: '支付宝',
      prop: 'alipayOfficialCommission',
      width: '90px'
    },
    {
      label: '微信',
      prop: 'wechatOfficialCommission',
      width: '90px'
    }
  ],
  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: []
  }
}

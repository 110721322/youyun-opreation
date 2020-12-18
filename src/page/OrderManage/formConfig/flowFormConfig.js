export const SEARCH_CONFIG = {
  formData: [{
    type: 0,
    label: '订单号',
    key: 'orderNo',
    labelWidth: '120px',
    span: 12
  },
  {
    type: 1,
    label: "支付门店",
    key: "shopNo",
    labelWidth: '120px',
    span: 12,
    options: [
    ]
  },
  {
    type: 9,
    label: '交易时间',
    key: 'date',
    datatype: 'queryPayTime',
    showDateBtn: false,
    labelWidth: '120px',
    quickPickerType: 2,
    span: 24,
    style: 'width:100%'
  },
  {
    type: 1,
    label: "交易类型",
    key: "tradeType",
    labelWidth: '120px',
    span: 12,
    options: [
    ]
  },
  {
    type: 1,
    label: "支付方式",
    key: "payWay",
    labelWidth: '120px',
    span: 12,
    options: [
      {label: "余额", value: 'balance'},
      {label: "支付宝", value: 'alipay'},
      {label: "微信", value: 'wechat'},
      {label: "云闪付", value: 'cloudPay'}
    ]
  },
  {
    type: 1,
    label: "所属服务商",
    key: "agentNo",
    labelWidth: '120px',
    span: 12,
    options: [
    ]
  },
  {
    type: 1,
    label: "所属商户",
    key: "merchantNo",
    labelWidth: '120px',
    span: 12,
    options: [
    ]
  },
  {
    type: 1,
    label: "交易状态",
    key: "payWay",
    labelWidth: '120px',
    span: 12,
    options: [
      {label: "待支付", value: 0},
      {label: "支付中", value: 1},
      {label: "支付成功", value: 2},
      {label: "交易关闭", value: 3},
      {label: "部分退款", value: 4},
      {label: "全部退款", value: 5}
    ]
  },
  {
    type: 1,
    label: "设备类型",
    key: "deviceType",
    labelWidth: '120px',
    span: 12,
    options: [
    ]
  }],
  showFootBtn: true
}

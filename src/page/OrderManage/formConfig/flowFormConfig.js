import api from '@/api/api_agentManage'
export const SEARCH_CONFIG = {
  formData: [{
    type: 0,
    label: '订单号',
    key: 'orderNo',
    span: 12
  },
  {
    type: 1,
    label: "支付门店",
    key: "shopNo",
    span: 12,
    options: [
    ]
  },
  {
    label: '交易时间',
    key: 'date',
    type: 9,
    span: 24
  },
  {
    type: 1,
    label: "交易类型",
    key: "tradeType",
    span: 12,
    options: [
    ]
  },
  {
    type: 1,
    label: "支付方式",
    key: "payWay",
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
    label: '所属服务商',
    key: 'agentNo',
    isSearch: true,
    urlOptions: {
      searchKey: 'agentName',
      url: api.queryPageByCondition,
      keyName: 'agentNo',
      valueName: 'agentName',
      params: {
        currentPage: 1,
        pageSize: 20
      }
    },
    span: 12
  },
  {
    type: 1,
    label: "所属商户",
    key: "merchantNo",
    span: 12,
    options: [
    ]
  },
  {
    type: 1,
    label: "交易状态",
    key: "orderStatus",
    span: 12,
    options: [
      {label: "待支付", value: 0},
      {label: "支付中", value: 1},
      {label: "支付成功", value: 2},
      {label: "交易关闭", value: 3},
      {label: "部分退款", value: 4},
      {label: "全部退款", value: 5}
    ]
  }],
  showFootBtn: true
}

import api from '@/api/api_agentManage'
import api_merchantManage from '@/api/api_merchantManage'
import api_shop from '@/api/api_shop'
export const SEARCH_CONFIG = {
  formData: [{
    label: '交易时间',
    key: 'date',
    defaultDateType: 'first',
    dateType: 'datetimerange',
    type: 9,
    span: 24
  },
  {
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
    urlOptions: {
      url: api_shop.selectShopByConditon,
      params: {
      },
      searchKey: "shopName",
      keyName: "shopNo",
      valueName: "shopName"
    }
  },
    //TODO review: 无用的注释请删除
  // {
  //   type: 1,
  //   label: "交易类型",
  //   key: "tradeType",
  //   span: 12,
  //   options: [
  //   ]
  // },
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
    span: 12,
    emitEventBus: "handleAgentChange",
  },
  {
    label: '所属商户',
    key: 'merchantNo',
    eventName: "handleAgentChange",
    type: 1,
    span: 12,
    isSearch: true,
    urlOptions: {
      url: api_merchantManage.selectByCondition,
      params: {
        agentNo: ''
      },
      searchKey: "merchantName",
      keyName: "merchantNo",
      valueName: "merchantName"
    }
  },
  {
    type: 1,
    label: "交易状态",
    key: "orderStatus",
    span: 12,
    //TODO review: 状态值以常量替换
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
export const REFUND_SEARCH_CONFIG = {
  formData: [{
    label: '交易时间',
    key: 'date',
    defaultDateType: 'first',
    dateType: 'datetimerange',
    type: 9,
    span: 24
  },
  {
    type: 0,
    label: '退单号',
    key: 'refundOrderNo',
    span: 12
  },
  {
    type: 1,
    label: "支付门店",
    key: "shopNo",
    span: 12,
    urlOptions: {
      url: api_shop.selectShopByConditon,
      params: {
      },
      searchKey: "shopName",
      keyName: "shopNo",
      valueName: "shopName"
    }
  },
  {
    type: 1,
    label: "退款方式",
    key: "refundChannel",
    span: 12,
    //TODO review: 状态值以常量替换
    options: [
      {label: "乐刷", value: 'leshua'},
      {label: "网商", value: 'mybank'},
      {label: "支付宝", value: 'alipay'},
      {label: "微信", value: 'wechat'},
      {label: "新大陆", value: 'newland'}
    ]
  },
  {
    type: 1,
    label: "退单状态",
    key: "refundStatus",
    span: 12,
    //TODO review: 状态值以常量替换
    options: [
      {label: "待退款", value: 0},
      {label: "退款中", value: 1},
      {label: "退款成功", value: 2},
      {label: "退款失败", value: 3},
      {label: "退款关闭", value: 4}
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
    span: 12,
    emitEventBus: "handleAgentChange",
  },
  {
    label: '所属商户',
    key: 'merchantNo',
    eventName: "handleAgentChange",
    type: 1,
    span: 12,
    isSearch: true,
    urlOptions: {
      url: api_merchantManage.selectByCondition,
      params: {
        agentNo: ''
      },
      searchKey: "merchantName",
      keyName: "merchantNo",
      valueName: "merchantName"
    }
  }],
  showFootBtn: true
}

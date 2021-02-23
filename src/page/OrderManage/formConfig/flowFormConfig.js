import api from '@/api/api_agentManage'
import api_merchantManage from '@/api/api_merchantManage'
import api_shop from '@/api/api_shop'
import { TransactionFlow } from "@/libs/config/constant.config";
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
  {
    type: 1,
    label: "支付方式",
    key: "payWay",
    span: 12,
    options: [
      {label: "余额", value: TransactionFlow.BALANCE},
      {label: "支付宝", value: TransactionFlow.ALIPAY},
      {label: "微信", value: TransactionFlow.WECHAT},
      {label: "云闪付", value: TransactionFlow.CLOUDPAY}
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
    options: [
      {label: "待支付", value: TransactionFlow.UNPAY},
      {label: "支付中", value: TransactionFlow.PAYING},
      {label: "支付成功", value: TransactionFlow.PAY_SUCCESS},
      {label: "交易关闭", value: TransactionFlow.PAY_CLOSE},
      {label: "部分退款", value: TransactionFlow.PART_REFUND},
      {label: "全部退款", value: TransactionFlow.ALL_REFUND}
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
    options: [
      {label: "乐刷", value: TransactionFlow.LESHUA},
      {label: "网商", value: TransactionFlow.MYBANK},
      {label: "支付宝", value: TransactionFlow.ALIPAY},
      {label: "微信", value: TransactionFlow.WECHAT},
      {label: "新大陆", value: TransactionFlow.NEWLAND}
    ]
  },
  {
    type: 1,
    label: "退单状态",
    key: "refundStatus",
    span: 12,
    options: [
      {label: "待退款", value: TransactionFlow.UNPAY},
      {label: "退款中", value: TransactionFlow.PAYING},
      {label: "退款成功", value: TransactionFlow.PAY_SUCCESS},
      {label: "退款失败", value: TransactionFlow.PAY_CLOSE},
      {label: "退款关闭", value: TransactionFlow.PART_REFUND}
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

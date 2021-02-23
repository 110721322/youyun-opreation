import { TransactionFlow } from "@/libs/config/constant.config";
export const FORM_CONFIG = {
  orderInfoData: [
    {
      label: "订单号",
      key: "orderNo"
    },
    {
      label: "交易号",
      key: "transactionNo"
    },
    {
      label: "创建时间",
      key: "createTime"
    },
    {
      label: "交易时间",
      key: "payTime"
    },
    {
      label: "支付通道",
      key: "payChannel"
    },
    {
      label: "支付模式",
      key: "payTypeCN"
    },
    {
      label: "交易状态",
      key: "orderStatus",
      fieldType: 'render',
      render: (h, params) => {
        const actions = new Map([
          [TransactionFlow.UNPAY, '待支付'],
          [TransactionFlow.PAYING, '支付中'],
          [TransactionFlow.PAY_SUCCESS, '支付成功'],
          [TransactionFlow.PAY_CLOSE, '交易关闭'],
          [TransactionFlow.PART_REFUND, '部分退款'],
          [TransactionFlow.ALL_REFUND, '全部退款'],
          ['default', '--'],
        ])
        const statusTxt = actions.get(params.orderStatus) || actions.get('default')
        return h(
          'span', { 'class': 'f-fc-606266' }, statusTxt
        )
      }
    },
    {
      label: "订单金额",
      key: "totalAmount"
    },
    {
      label: "支付方式",
      key: "payWayName"
    },
    {
      label: "实收金额",
      key: "actualAmount"
    },
    {
      label: "手续费",
      key: "serviceFee"
    },
    {
      label: "退款金额",
      key: "refundAmount"
    },
    {
      label: "服务商分润",
      key: "agentCommission"
    },
    {
      label: "平台分润",
      key: "ourCommission"
    }
  ],
  moneyInfoData: [
    {
      label: "所属商户",
      key: "merchantName"
    },
    {
      label: "收款门店",
      key: "shopName"
    },
    {
      label: "收银员",
      key: "cashierName"
    }
  ],
  payInfoData: [
    {
      label: "支付账号",
      key: "userId"
    },
    {
      label: "备注",
      key: "remark"
    }
  ]
}

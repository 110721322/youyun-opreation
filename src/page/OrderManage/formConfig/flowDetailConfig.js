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
      key: "payWayName"
    },
    // {
    //   label: "交易类型",
    //   key: "tradeType"
    // },
    {
      label: "交易状态",
      key: "orderStatus",
      fieldType: 'render',
      render: (h, params) => {
        if (params.orderStatus === 0) {
          return h(
            'span', { 'class': 'f-fc-606266' }, '待支付'
          )
        } else if (params.orderStatus === 1) {
          return h(
            'span', { 'class': 'f-fc-606266' }, '支付中'
          )
        } else if (params.orderStatus === 2) {
          return h(
            'span', { 'class': 'f-fc-606266' }, '支付成功'
          )
        } else if (params.orderStatus === 3) {
          return h(
            'span', { 'class': 'f-fc-606266' }, '交易关闭'
          )
        } else if (params.orderStatus === 4) {
          return h(
            'span', { 'class': 'f-fc-606266' }, '部分退款'
          )
        } else if (params.orderStatus === 5) {
          return h(
            'span', { 'class': 'f-fc-606266' }, '全部退款'
          )
        }
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
    // {
    //   label: "所属服务商",
    //   key: "agentName"
    // },
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
    // {
    //   label: "设备类型",
    //   key: "deviceType"
    // },
    // {
    //   label: "设备型号",
    //   key: "deviceNo"
    // },
    // {
    //   label: "设备SN",
    //   key: "key"
    // }
  ],
  payInfoData: [
    {
      label: "支付账号",
      key: "payAccount"
    },
    {
      label: "备注",
      key: "remark"
    }
  ]
}

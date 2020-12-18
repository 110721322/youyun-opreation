export const FORM_CONFIG = {
  orderInfoData: {
    name: "订单信息",
    items: [
      {
        name: "订单号",
        key: "orderNo"
      },
      {
        name: "交易号",
        key: "transactionNo"
      },
      {
        name: "创建时间",
        key: "creatTime"
      },
      {
        name: "交易时间",
        key: "payTime"
      },
      {
        name: "支付通道",
        key: "payChannel"
      },
      {
        name: "支付模式",
        key: "payWay"
      },
      {
        name: "交易类型",
        key: "tradeType"
      },
      {
        name: "交易状态",
        key: "orderStatus"
      },
      {
        name: "订单金额",
        key: "totalAmount"
      },
      {
        name: "支付方式",
        key: "payWayName"
      },
      {
        name: "实收金额",
        key: "actualAmount"
      },
      {
        name: "手续费",
        key: "serviceFee"
      },
      {
        name: "退款金额",
        key: "refundAmount"
      },
      {
        name: "服务商分润",
        key: "agentCommission"
      },
      {
        name: "平台分润",
        key: "ourCommission"
      }
    ]
  },
  moneyInfoData: {
    name: "收款信息",
    items: [
      {
        name: "所属服务商",
        key: "agentName"
      },
      {
        name: "所属商户",
        key: "merchantName"
      },
      {
        name: "收款门店",
        key: "shopName"
      },
      {
        name: "收银员",
        key: "cashierName"
      },
      {
        name: "设备类型",
        key: "deviceType"
      },
      {
        name: "设备型号",
        key: "deviceNo"
      }
      // {
      //   name: "设备SN",
      //   key: "key"
      // }
    ]
  },
  payInfoData: {
    name: "付款信息",
    items: [
      {
        name: "支付账号",
        key: "payAccount"
      },
      {
        name: "备注",
        key: "remark"
      }
    ]
  }
}

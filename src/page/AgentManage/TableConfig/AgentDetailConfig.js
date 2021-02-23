import utils from "youyun-vue-components/global/kit/utils";
export const DETAILCONFIG = {
  shopInfoData: [
    {
      label: "服务商ID",
      key: "agentNo"
    },
    {
      label: "服务商名称",
      key: "agentName"
    },
    {
      label: "手机号码",
      key: "loginAccount"
      // TODO emitEdit: 'editTel'
    },
    {
      label: "到期时间",
      key: "expireDate"
    },
    {
      label: "服务商状态",
      key: "blockStatus",
      emitEdit: 'editStatus',
      fieldType: 'slot',
      slot: 'status'
    },
    {
      label: "管理员",
      key: "operationName"
    },
    {
      label: "地址",
      key: "fullAddress",
      fieldType: 'tooltip'
    }
  ],
  rateInfoData: [
    {
      label: "费率信息",
      key: "rate",
      fieldType: 'render',
      render: (h, ruleForm) => {
        return (
          <p class="f-fc-606266">
            <i class="iconfont iconzhifubao f-fc-ali" style="margin-right:4px;"></i>
            <span style="margin-right:8px;">{ utils.AccMul(ruleForm.alipayRate) }%</span>
            <i class="iconfont iconweixin f-fc-wx" style="margin-right:4px;"></i>
            { utils.AccMul(ruleForm.wechatPayRate) }%
          </p>
        )
      }
    },
    {
      label: '服务商利润分成',
      key: 'chargeFeePercent',
      formatter($ruleForm) {
        return utils.AccMul($ruleForm.chargeFeePercent) + '%'
      }
    }
  ],
  bankInfoData: [
    {
      label: "开户支行",
      key: "bankBranchName",
      fieldType: 'tooltip'
    },
    {
      label: '银行卡账号',
      key: 'bankCardNo'
    },
    {
      label: '开户人姓名',
      key: 'bankAccountHolder'
    }
  ]
}

export const AGENT_DETAIL_STATIC = [
  {
    span: 6,
    style: 'height: 134px;',
    label: '实收总额',
    icon: '',
    iconStyle: 'color: #50C514;',
    tooltip: '',
    key: 'actualAmount',
    labelCallback($params) {
      return this.label + '（' + $params.tradeCount + '笔）'
    },
    value: null,
    children: [
      {
        label: '昨日订单金额',
        key: 'lastActualAmount',
        labelCallback($params) {
          return this.label + '（' + $params.lastTradeCount + '笔）'
        },
        formatter($params) {
          return '¥' + $params.lastActualAmount
        },
        value: null
      }
    ]
  },
  {
    span: 6,
    style: 'height: 134px;',
    label: '平台佣金总计（元）',
    icon: '',
    iconStyle: 'color: #50C514;',
    tooltip: '',
    key: 'topAgentCommission',
    value: null,
    children: [
      {
        label: '昨日平台佣金',
        key: 'lastTopAgentCommission',
        formatter($params) {
          return '¥' + $params.lastTopAgentCommission
        },
        value: '¥0'
      }
    ]
  },
  {
    span: 6,
    style: 'height: 134px;',
    label: '订单佣金总计（元）',
    icon: '',
    iconStyle: 'color: #50C514;',
    tooltip: '',
    key: 'agentCommission',
    value: null,
    children: [
      {
        label: '昨日订单佣金',
        key: 'lastAgentCommission',
        formatter($params) {
          return '¥' + $params.lastAgentCommission
        },
        value: null
      }
    ]
  },
  {
    span: 6,
    style: 'height: 134px;',
    label: '可结算佣金（元）',
    icon: '',
    iconStyle: 'color: #50C514;',
    tooltip: '',
    key: 'unSettleAmount',
    value: null,
    children: [
      {
        label: '已结算佣金',
        key: 'settledAmount',
        formatter($params) {
          return '¥' + $params.settledAmount
        },
        value: null
      }
    ]
  },
  {
    span: 6,
    style: 'height: 160px;',
    label: '退款总额',
    icon: '',
    iconStyle: 'color: #1989FA;',
    tooltip: '',
    key: 'refundAmount',
    labelCallback($params) {
      return this.label + '（' + $params.refundCount + '笔）'
    },
    value: null,
    children: [
      {
        label: '昨日退款金额',
        key: 'lastRefundAmount',
        labelCallback($params) {
          return this.label + '（' + $params.lastRefundCount + '笔）'
        },
        formatter($params) {
          return '¥' + $params.lastRefundAmount
        },
        value: null
      }
    ]
  },
  {
    span: 6,
    style: 'height: 160px;',
    label: '商户数量（个）',
    icon: '',
    iconStyle: 'color: #FA6577;',
    tooltip: '',
    key: 'merchantCount',
    value: null,
    children: [
      {
        label: '昨日新增商户（个）',
        key: 'lastNewMerchantCount',
        value: null,
        span: 24
      }
      // TODO {
      //   label: '昨日活跃商户（个）',
      //   value: '0',
      //   span: 24
      // }
    ]
  },
  {
    span: 6,
    style: 'height: 160px;',
    label: '门店数量（个）',
    icon: '',
    iconStyle: 'color: #FA6577;',
    tooltip: '',
    key: 'shopCount',
    value: null,
    children: [
      {
        label: '昨日新增门店（个）',
        key: 'lastNewShopCount',
        value: null,
        span: 24
      },
      // TODO {
      //   label: '昨日活跃门店（个）',
      //   value: '0',
      //   span: 24
      // },
      {
        label: '待审核门店（个）',
        key: 'auditingShopCount',
        value: null,
        span: 24
      }
    ]
  },
  {
    span: 6,
    style: 'height: 160px;',
    label: '设备总数（个）',
    icon: '',
    iconStyle: 'color: #FA6577;',
    tooltip: '',
    key: 'deviceCount',
    value: null,
    children: [
      // TODO {
      //   label: '昨日新增设备（台）',
      //   value: '0',
      //   span: 24
      // },
      // TODO {
      //   label: '昨日活跃设备（台）',
      //   value: '0',
      //   span: 24
      // },
      {
        label: '待绑定设备数（台）',
        value: null,
        key: 'unBindDeviceCount',
        span: 24
      }
    ]
  }
]

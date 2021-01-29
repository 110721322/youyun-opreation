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
    label: '实收总额（0笔）',
    icon: '',
    iconStyle: 'color: #50C514;',
    tooltip: '',
    key: 'actualAmount',
    value: '0',
    children: [
      {
        label: '昨日订单金额（0笔）',
        key: 'lastActualAmount',
        value: '¥0'
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
    value: '0',
    children: [
      {
        label: '昨日平台佣金',
        key: 'lastTopAgentCommission',
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
    value: '0',
    children: [
      {
        label: '昨日订单佣金',
        key: 'lastAgentCommission',
        value: '¥0'
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
    value: '0',
    children: [
      {
        label: '已结算佣金',
        key: 'settledAmount',
        value: '¥0'
      }
    ]
  },
  {
    span: 6,
    style: 'height: 160px;',
    label: '退款总额（0笔）',
    icon: '',
    iconStyle: 'color: #1989FA;',
    tooltip: '',
    key: 'refundAmount',
    value: '0',
    children: [
      {
        label: '昨日退款金额（0笔）',
        key: 'lastRefundAmount',
        value: '¥0'
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
    value: '0',
    children: [
      {
        label: '昨日新增商户（个）',
        key: 'lastNewMerchantCount',
        value: '0',
        span: 24
      }
      // {
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
    value: '0',
    children: [
      {
        label: '昨日新增门店（个）',
        key: 'lastNewShopCount',
        value: '0',
        span: 24
      },
      // {
      //   label: '昨日活跃门店（个）',
      //   value: '0',
      //   span: 24
      // },
      {
        label: '待审核门店（个）',
        key: 'auditingShopCount',
        value: '0',
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
    value: '0',
    children: [
      // {
      //   label: '昨日新增设备（台）',
      //   value: '0',
      //   span: 24
      // },
      // {
      //   label: '昨日活跃设备（台）',
      //   value: '0',
      //   span: 24
      // },
      {
        label: '待绑定设备数（台）',
        value: '0',
        key: 'unBindDeviceCount',
        span: 24
      }
    ]
  }
]

import { DataCenter } from "@/libs/config/constant.config";

export const INFO_LIST = [
  {
    span: 8,
    prop: 'totalAmount',
    style: 'height: 132px;',
    label: '支付总额（元）',
    icon: 'iconjine',
    iconStyle: 'color: #1989FA;',
    tooltip: '展示平台其下订单支付总金额，单位元，保留小数点后两位',
    value: null,
    children: [
      {
        label: '统计支付金额',
        prop: 'dayTradeAmount',
        formatter($params) {
          return '¥' + $params.dayTradeAmount
        },
        value: null
      }
    ]
  },
  {
    span: 8,
    prop: 'tradeCount',
    style: 'height: 132px;',
    label: '支付笔数（笔）',
    icon: 'iconshuliang',
    iconStyle: 'color: #1989FA;',
    tooltip: '展示平台其下订单支付总笔数，单位‘笔’',
    value: null,
    children: [
      {
        label: '统计支付笔数',
        prop: 'dayTradeCount',
        formatter($params) {
          return $params.dayTradeCount + '笔'
        },
        value: null
      }
    ]
  },
  {
    span: 8,
    style: 'height: 132px;margin-right: 0;',
    label: '平台佣金（元）',
    prop: 'platformCommission',
    icon: 'iconfenzhang',
    iconStyle: 'color: #EFA911;',
    tooltip: '展示平台获得佣金总金额，单位元，保留小数点后两位',
    value: null,
    children: [
      {
        label: '统计佣金',
        prop: 'dayPlatformCommission',
        formatter($params) {
          return '¥' + $params.dayTradeAmount
        },
        value: null
      }
    ]
  },
  {
    span: 12,
    style: 'height: 159px;',
    prop: 'agentCount',
    label: '服务商数量（个）',
    icon: 'iconshuliang',
    iconStyle: 'color: #EFA911;',
    tooltip: '默认统计平台服务商总数量（所有状态下，启用/禁用）',
    value: null,
    children: [
      {
        label: '统计新增服务数（个）',
        prop: 'dayNewAgentCount',
        value: null,
        span: 12
      },
      {
        label: '统计活跃服务商数（个）',
        prop: 'dayActiveAgentCount',
        value: null,
        span: 12
      }
    ]
  },
  {
    span: 12,
    style: 'height: 159px;margin-right: 0;',
    prop: 'merchantCount',
    label: '商户数量（个）',
    icon: 'iconshuliang',
    iconStyle: 'color: #EFA911;',
    tooltip: '默认统计平台商户总数量（所有状态下）',
    value: null,
    children: [
      {
        label: '统计新增商户数（个）',
        prop: 'dayNewMerchantCount',
        value: null,
        span: 12
      },
      {
        label: '统计活跃商户数（个）',
        prop: 'dayActiveMerchantCount',
        value: null,
        span: 12
      }
    ]
  },
  {
    span: 12,
    style: 'height: 159px;',
    prop: 'shopCount',
    label: '门店数量（个）',
    icon: 'iconshuliang',
    iconStyle: 'color: #65CC30;',
    tooltip: '默认统计平台门店（总店）总数量（所有状态下）',
    value: null,
    children: [
      {
        label: '统计新增门店数（个）',
        prop: 'dayNewShopCount',
        value: null,
        span: 8
      },
      {
        label: '统计活跃门店数（个）',
        prop: 'dayActiveShopCount',
        value: null,
        span: 8
      },
      {
        label: '审核中门店数（个）',
        prop: 'dayAuditShopCount',
        value: null,
        valueStyle: 'color: #1989FA;text-decoration: underline;cursor: pointer;',
        valueEmit: 'shopCount',
        span: 8
      }
    ]
  },
  {
    span: 12,
    style: 'height: 159px;margin-right: 0;',
    prop: 'deviceCount',
    label: '设备总数（台）',
    icon: 'iconshuliang',
    iconStyle: 'color: #65CC30;',
    tooltip: '默认统计平台设备总数量（所有状态下）',
    value: null,
    children: [
      {
        label: '统计新增设备数（台）',
        prop: 'dayNewDeviceCount',
        value: null,
        span: 8
      },
      {
        label: '统计活跃设备数（台）',
        prop: 'dayActiveDeviceCount',
        value: null,
        span: 8
      },
      {
        label: '待绑定设备数（台）',
        prop: 'dayBindingDeviceCount',
        value: null,
        span: 8
      }
    ]
  }
]

export const RATIO_GROUP_CONFIG = [
  {
    ratio: 0,
    color: '#3AA0FF',
    label: '支付宝',
    prop: DataCenter.ALI_PAY_AMOUNT,
    value: null
  },
  {
    ratio: 0,
    color: '#4DCB73',
    label: '微信',
    prop: DataCenter.WX_PAY_AMOUNT,
    value: null
  }
]

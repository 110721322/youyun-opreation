export const INFO_LIST = [
  {
    span: 8,
    style: 'height: 132px;',
    label: '支付总额（元）',
    icon: 'iconjine',
    iconStyle: 'color: #1989FA;',
    tooltip: '展示平台其下订单支付总金额，单位元，保留小数点后两位',
    value: '126,560.00',
    children: [
      {
        label: '今日支付金额',
        value: '¥12,423.00'
      }
    ]
  },
  {
    span: 8,
    style: 'height: 132px;',
    label: '支付笔数（笔）',
    icon: 'iconshuliang',
    iconStyle: 'color: #1989FA;',
    tooltip: '展示平台其下订单支付总笔数，单位‘笔’',
    value: '126,560.00',
    children: [
      {
        label: '今日支付笔数',
        value: '60笔'
      }
    ]
  },
  {
    span: 8,
    style: 'height: 132px;margin-right: 0;',
    label: '平台佣金（元）',
    icon: 'iconfenzhang',
    iconStyle: 'color: #EFA911;',
    tooltip: '展示平台获得佣金总金额，单位元，保留小数点后两位',
    value: '126,560.00',
    children: [
      {
        label: '今日分润',
        value: '126,560.00'
      }
    ]
  },
  {
    span: 12,
    style: 'height: 159px;',
    label: '服务商数量（个）',
    icon: 'iconshuliang',
    iconStyle: 'color: #EFA911;',
    tooltip: '默认统计平台服务商总数量（所有状态下，启用/禁用）',
    value: '126,560.00',
    children: [
      {
        label: '今日新增服务商数（个）',
        value: '12,423',
        span: 12
      },
      {
        label: '今日活跃服务商数（个）',
        value: '12,423',
        span: 12
      }
    ]
  },
  {
    span: 12,
    style: 'height: 159px;margin-right: 0;',
    label: '商户数量（个）',
    icon: 'iconshuliang',
    iconStyle: 'color: #EFA911;',
    tooltip: '默认统计平台商户总数量（所有状态下）',
    value: '126,560.00',
    children: [
      {
        label: '今日新增商户数（个）',
        value: '12,423',
        span: 12
      },
      {
        label: '今日活跃商户数（个）',
        value: '12,423',
        span: 12
      }
    ]
  },
  {
    span: 12,
    style: 'height: 159px;',
    label: '门店数量（个）',
    icon: 'iconshuliang',
    iconStyle: 'color: #65CC30;',
    tooltip: '默认统计平台门店（总店）总数量（所有状态下）',
    value: '126,560.00',
    children: [
      {
        label: '今日新增门店数（个）',
        value: '12,423',
        span: 8
      },
      {
        label: '今日活跃门店数（个）',
        value: '12,423',
        span: 8
      },
      {
        label: '审核中门店数（个）',
        value: '12,423',
        valueStyle: 'color: #1989FA;text-decoration: underline;',
        span: 8
      }
    ]
  },
  {
    span: 12,
    style: 'height: 159px;margin-right: 0;',
    label: '设备总数（台）',
    icon: 'iconshuliang',
    iconStyle: 'color: #65CC30;',
    tooltip: '默认统计平台设备总数量（所有状态下）',
    value: '126,560.00',
    children: [
      {
        label: '今日新增设备数（台）',
        value: '12,423',
        span: 8
      },
      {
        label: '今日活跃设备数（台）',
        value: '12,423',
        span: 8
      },
      {
        label: '待绑定设备数（台）',
        value: '12,423',
        valueStyle: 'color: #1989FA;text-decoration: underline;',
        span: 8
      }
    ]
  }
]

export const RATIO_GROUP_CONFIG = [
  {
    ratio: 46,
    color: '#3AA0FF',
    label: '支付宝',
    value: '4500.00'
  },
  {
    ratio: 54,
    color: '#4DCB73',
    label: '微信',
    value: '4500.00'
  }
]

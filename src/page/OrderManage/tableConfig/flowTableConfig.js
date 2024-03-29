import { TransactionFlow } from "@/libs/config/constant.config";
export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '订单号',
      prop: 'orderNo',
      width: '100px',
      render: (h, params) => {
        return h(
            'span', {'class': 'tab-color' }, params.row.orderNo
        )
      }
    },
    {
      label: '创建时间',
      prop: 'payTime',
      width: '110px'
    },
    {
      label: '所属服务商',
      prop: 'agentName'
    },
    {
      label: '所属商户',
      prop: 'merchantName'
    },
    {
      label: '支付门店',
      prop: 'shopName'
    },
    {
      label: '支付方式',
      prop: 'payWayName'
    },
    {
      label: '实收金额',
      prop: 'actualAmount'
    },
    {
      label: '服务商分润',
      prop: 'agentCommission'
    },
    {
      label: '平台分润',
      prop: 'topAgentCommission'
    },
    {
      label: '手续费',
      prop: 'serviceFee'
    },
    {
      label: '交易状态',
      prop: 'orderStatus',
      render: (h, params) => {
        const actions = new Map([
          [TransactionFlow.UNPAY, {className: 's-status-pending', statusDesc: '待支付'}],
          [TransactionFlow.PAYING, {className: 's-status-pending', statusDesc: '支付中'}],
          [TransactionFlow.PAY_SUCCESS, {className: 's-status-success', statusDesc: '支付成功'}],
          [TransactionFlow.PAY_CLOSE, {className: 's-status-pending', statusDesc: '交易关闭'}],
          [TransactionFlow.PART_REFUND, {className: 's-status-pending', statusDesc: '部分退款'}],
          [TransactionFlow.ALL_REFUND, {className: 's-status-fail', statusDesc: '全部退款'}],
          ['default', {className: 's-status-pending', statusDesc: '--'}]
        ])
        const action = actions.get(params.row.orderStatus) || actions.get('default')
        return (
          <span class={['flex-align-center', 'g-status-icon', 's-status-radius', action.className]}>{ action.statusDesc }</span>
      )
      }
    }
  ],

  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: [
      {
        name: '详情',
        emitName: 'detail',
        type: 'text'
      }
    ]
  },
  // 表单基础数据类型，需要预先赋值
  formModel: {
    id: '',
    tel: '',
    name: '',
    email: '',
    status: '',
    create_time: '',
    expand: '',
    roleIdList: []
  },
  hideEditArea: false
};
export const REFUND_TABLE_CONFIG = {
  gridConfig: [
    {
      label: '退单号',
      prop: 'refundNo',
      width: '100px',
      render: (h, params) => {
        return h(
            'span', {'class': 'tab-color' }, params.row.refundNo
        )
      }
    },
    {
      label: '退款时间',
      prop: 'createTime',
      width: '110px'
    },
    {
      label: '所属服务商',
      prop: 'agentName'
    },
    {
      label: '所属商户',
      prop: 'merchantName'
    },
    {
      label: '支付门店',
      prop: 'shopName'
    },
    {
      label: '退款方式',
      prop: 'refundChannelName'
    },
    {
      label: '退款金额',
      prop: 'actualAmount'
    },
    {
      label: '退单状态',
      prop: 'refundStatus',
      render: (h, params) => {
        const actions = new Map([
          [TransactionFlow.UNPAY, {className: 's-status-pending', statusDesc: '待退款'}],
          [TransactionFlow.PAYING, {className: 's-status-pending', statusDesc: '退款中'}],
          [TransactionFlow.PAY_SUCCESS, {className: 's-status-success', statusDesc: '退款成功'}],
          [TransactionFlow.PAY_CLOSE, {className: 's-status-fail', statusDesc: '退款失败'}],
          [TransactionFlow.PART_REFUND, {className: 's-status-fail', statusDesc: '退款关闭'}],
          ['default', {className: 's-status-pending', statusDesc: '--'}]
        ])
        const action = actions.get(params.row.refundStatus) || actions.get('default')
        return (
          <span class={['flex-align-center', 'g-status-icon', 's-status-radius', action.className]}>{ action.statusDesc }</span>
      )
      }
    }
  ],

  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: [
      {
        name: '详情',
        emitName: 'detail',
        type: 'text'
      }
    ]
  },
  // 表单基础数据类型，需要预先赋值
  formModel: {
    id: '',
    tel: '',
    name: '',
    email: '',
    status: '',
    create_time: '',
    expand: '',
    roleIdList: []
  },
  hideEditArea: false
};
export const INFO_LIST = [
  {
    span: 8,
    style: 'height: 91px;',
    label: '订单总额（元）',
    icon: 'iconshuliang',
    iconStyle: 'color: #5AD8A6;',
    tooltip: '',
    key: 'totalAmount',
    value: null,
    children: []
  },
  {
    span: 8,
    style: 'height: 91px;',
    label: '',
    icon: 'iconshenhechenggong',
    iconStyle: 'color: #50C514;',
    tooltip: '',
    key: 'actualAmount',
    labelFormatter($params) {
      return `实收总额(${ $params.actualCount }笔)`
    },
    value: null,
    children: []
  },
  {
    span: 8,
    style: 'height: 91px;margin-right: 0;',
    label: '',
    icon: 'icontuikuan',
    iconStyle: 'color: #F62735;',
    tooltip: '',
    labelFormatter($params) {
      return `退款总额(${ $params.refundCount }笔)`
    },
    key: 'refundAmount',
    value: null,
    children: []
  },
  {
    span: 8,
    style: 'height: 91px;',
    label: '手续费总额（元）',
    icon: 'iconshouxufei',
    iconStyle: 'color: #1989FA;',
    tooltip: '',
    key: 'serviceFee',
    value: null,
    children: []
  },
  {
    span: 8,
    style: 'height: 91px;',
    label: '服务商佣金总额（元）',
    icon: 'iconfenzhang',
    iconStyle: 'color: #EFA911;',
    tooltip: '',
    key: 'agentCommission',
    value: '',
    children: []
  },
  {
    span: 8,
    style: 'height: 91px;margin-right: 0;',
    label: '平台佣金总额（元）',
    icon: 'iconfenzhang',
    iconStyle: 'color: #EFA911;',
    tooltip: '',
    key: 'platformCommission',
    value: '',
    children: []
  }
]

export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '订单号',
      prop: 'orderNo'
    },
    {
      label: '交易时间',
      prop: 'tradeTime'
    },
    {
      label: '交易类型',
      prop: 'tradeType'
    },
    // {
    //   label: '设备类型',
    //   prop: 'diviceType'
    // },
    // {
    //   label: '设备SN',
    //   prop: 'deviceSN'
    // },
    {
      label: '实收金额',
      prop: 'tradeAmount'
    },
    {
      label: '交易状态',
      prop: 'orderStatus',
      render: (h, params) => {
        if (params.row.tradeType === '支付') {
          const actions = new Map([
            [0, {className: 's-status-pending', statusDesc: '待支付'}],
            [1, {className: 's-status-pending', statusDesc: '支付中'}],
            [2, {className: 's-status-success', statusDesc: '支付成功'}],
            [3, {className: 's-status-success', statusDesc: '交易关闭'}],
            [4, {className: 's-status-pending', statusDesc: '部分退款'}],
            [5, {className: 's-status-pending', statusDesc: '全部退款'}],
            ['default', {className: 's-status-pending', statusDesc: '等待'}],
          ])
          const action = actions.get(params.row.orderStatus) || actions.get('default')
          return (
            <span class={['flex-align-center', 'g-status-icon', 's-status-radius', action.className]}>{ action.statusDesc }</span>
          )
        } else {
          const actions = new Map([
            [0, {className: 's-status-pending', statusDesc: '待退款'}],
            [1, {className: 's-status-pending', statusDesc: '退款中'}],
            [2, {className: 's-status-success', statusDesc: '退款成功'}],
            [3, {className: 's-status-fail', statusDesc: '退款失败'}],
            [4, {className: 's-status-pending', statusDesc: '退款关闭'}],
            ['default', {className: 's-status-pending', statusDesc: '等待'}],
          ])
          const action = actions.get(params.row.orderStatus) || actions.get('default')
          return (
            <span class={['flex-align-center', 'g-status-icon', 's-status-radius', action.className]}>{ action.statusDesc }</span>
        )
        }
      }
    },
    {
      label: '操作员',
      prop: 'cashierName'
    }
  ],

  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: [
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
  hideEditArea: true
};

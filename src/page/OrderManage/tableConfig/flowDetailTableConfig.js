export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '订单号',
      prop: 'orderNo'
    },
    {
      label: '交易时间',
      prop: 'payTime'
    },
    {
      label: '交易类型',
      prop: 'tradeType',
      render: (h, params) => {
        const actions = new Map([
          [0, {className: 's-status-fail', statusDesc: '全额退'}],
          [1, {className: 's-status-fail', statusDesc: '部分退'}]
        ])
        const action = actions.get(params.row.tradeType) || actions.get('default')
        return (
          <span class={['flex-align-center', 'g-status-icon', 's-status-radius', action.className]}>{ action.statusDesc }</span>
      )
      }
    },
    {
      label: '设备类型',
      prop: 'diviceType'
    },
    {
      label: '设备SN',
      prop: 'deviceSN'
    },
    {
      label: '实收（退）金额',
      prop: 'tradeAmount'
    },
    {
      label: '交易状态',
      prop: 'orderStatus',
      render: (h, params) => {
        const actions = new Map([
          [0, {className: 's-status-pending', statusDesc: '待支付'}],
          [1, {className: 's-status-pending', statusDesc: '支付中'}],
          [2, {className: 's-status-success', statusDesc: '支付成功'}],
          [3, {className: 's-status-fail', statusDesc: '交易关闭'}],
          [4, {className: 's-status-fail', statusDesc: '部分退款'}],
          [5, {className: 's-status-fail', statusDesc: '全部退款'}]
        ])
        const action = actions.get(params.row.orderStatus) || actions.get('default')
        return (
          <span class={['flex-align-center', 'g-status-icon', 's-status-radius', action.className]}>{ action.statusDesc }</span>
      )
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

import { TransactionFlow } from "@/libs/config/constant.config";
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
            [TransactionFlow.UNPAY, {className: 's-status-pending', statusDesc: '待支付'}],
            [TransactionFlow.PAYING, {className: 's-status-pending', statusDesc: '支付中'}],
            [TransactionFlow.PAY_SUCCESS, {className: 's-status-success', statusDesc: '支付成功'}],
            [TransactionFlow.PAY_CLOSE, {className: 's-status-success', statusDesc: '交易关闭'}],
            [TransactionFlow.PART_REFUND, {className: 's-status-pending', statusDesc: '部分退款'}],
            [TransactionFlow.ALL_REFUND, {className: 's-status-pending', statusDesc: '全部退款'}],
            ['default', {className: 's-status-pending', statusDesc: '等待'}],
          ])
          const action = actions.get(params.row.orderStatus) || actions.get('default')
          return (
            <span class={['flex-align-center', 'g-status-icon', 's-status-radius', action.className]}>{ action.statusDesc }</span>
          )
        } else {
          const actions = new Map([
            [TransactionFlow.UNPAY, {className: 's-status-pending', statusDesc: '待退款'}],
            [TransactionFlow.PAYING, {className: 's-status-pending', statusDesc: '退款中'}],
            [TransactionFlow.PAY_SUCCESS, {className: 's-status-success', statusDesc: '退款成功'}],
            [TransactionFlow.PAY_CLOSE, {className: 's-status-fail', statusDesc: '退款失败'}],
            [TransactionFlow.PART_REFUND, {className: 's-status-pending', statusDesc: '退款关闭'}],
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

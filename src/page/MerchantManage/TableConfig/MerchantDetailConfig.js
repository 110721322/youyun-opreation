export const MERCHANT_DETAIL_CONFIG = {
  gridConfig: [
    {
      label: '门店ID',
      prop: 'shopNo',
      render: (h, params) => {
        return h(
          'span', {'class': 'tab-color' }, params.row.shopNo
        )
      }
    },
    {
      label: '门店名称',
      prop: 'shopName',
    },
    {
      label: '门店类目',
      prop: 'mccCodeCN',
    },
    {
      label: '服务电话',
      prop: 'phone'
    },
    {
      label: '门店地址',
      prop: 'address'
    },
    {
      label: '门店状态',
      prop: 'isDisabled',
      render: (h, params) => {
        const actions = new Map([
          [0, {className: 's-status-success', statusDesc: '启用'}],
          [1, {className: 's-status-fail', statusDesc: '禁用'}],
          ['default', {className: 's-status-pending', statusDesc: '等待'}],
        ])
        const action = actions.get(params.row.isDisabled) || actions.get('default')
        return (
          <span class={['flex-align-center', 'g-status-icon', 's-status-radius', action.className]}>{ action.statusDesc }</span>
      )
      }
    },
    {
      label: '审核状态',
      prop: 'status',
      render: (h, params) => {
        const actions = new Map([
          [1, {className: 's-status-pending', statusDesc: '平台审核中'}],
          [2, {className: 's-status-pending', statusDesc: '通道审核中'}],
          [3, {className: 's-status-success', statusDesc: '已开通'}],
          [4, {className: 's-status-fail', statusDesc: '已驳回'}],
          ['default', {className: 's-status-pending', statusDesc: '等待'}],
        ])
        const action = actions.get(params.row.status) || actions.get('default')
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
        emitName: 'details',
        type: 'text'
      },
      {
        name: '门店后台',
        emitName: 'goMerchant',
        type: 'text'
      }
    ]
  }
};

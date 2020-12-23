export const AGENT_LIST_CONFIG = {
  gridConfig: [
    {
      label: '服务商ID',
      prop: 'agentNo',
      render: (h, params) => {
        return h(
          'span', { 'class': 'tab-color' }, params.row.agentNo
        )
    }
    },
    {
      label: '服务商名称',
      prop: 'agentName',
    },
    {
      label: '手机号码',
      prop: 'loginAccount',
    },
    {
      label: '商户数量',
      prop: 'merchantCount'
    },
    {
      label: '到期时间',
      prop: 'expireDate'
    },
    {
      label: '管理员',
      prop: 'operationName'
    },
    {
      label: '状态',
      prop: 'blockStatus',
      render: (h, params) => {
        const actions = new Map([
          [1, {className: 's-status-success', statusDesc: '启用'}],
          [2, {className: 's-status-fail', statusDesc: '禁用'}],
          [3, {className: 's-status-fail', statusDesc: '封禁'}],
          [4, {className: 's-status-fail', statusDesc: '冻结'}],
          ['default', {className: 's-status-pending', statusDesc: '等待'}],
        ])
        const action = actions.get(params.row.blockStatus) || actions.get('default')
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
        name: '服务商后台',
        emitName: 'goAgent',
        type: 'text'
      }
    ]
  }
};

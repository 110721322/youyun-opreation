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
      prop: 'endDate'
    },
    {
      label: '管理员',
      prop: 'operationName'
    },
    {
      label: '状态',
      prop: 'status',
      render: (h, params) => {
        if (params.row.status === 0) {
          return h('div', {'class': 'tab-reject'},[h('span', {'class': "dot " + "reject"}), '禁用'])
        } else if (params.row.status === 1) {
          return [h('span', {'class': "dot " + "opened"}), '启用']
        }
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

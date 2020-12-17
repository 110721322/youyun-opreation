export const AGENT_SETTLE_CONFIG = {
  gridConfig: [
    {
      label: '结算ID',
      prop: 'id',
      render: (h, params) => {
        return h(
          'span', {'class': 'tab-color' }, params.row.id
        )
      }
    },
    {
      label: '创建时间',
      prop: 'createTime',
    },
    {
      label: '结算金额',
      prop: 'actualAmount',
    },
    {
      label: '服务商',
      prop: 'agentName'
    },
    {
      label: '处理状态',
      prop: 'settleStatus',
      render: (h, params) => {
        if (params.row.settleStatus === 0) {
          return [h('span', {
            'class': "dot " + "reject"
          }), '驳回']
        } else if (params.row.settleStatus === 1) {
          return [h('span', {
            'class': "dot " + "opened"
          }), '待处理']
        } else if (params.row.settleStatus === 2) {
          return [h('span', {
            'class': "dot " + "success"
          }), '成功']
        }
      }
    },
    {
      label: '处理时间',
      prop: 'updateTime'
    },
    {
      label: '操作人',
      prop: 'operationer'
    },
    {
      label: '备注',
      prop: 'remark'
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
      }
    ]
  }
};

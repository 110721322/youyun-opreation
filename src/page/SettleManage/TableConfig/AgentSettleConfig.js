export const AGENT_SETTLE_CONFIG = {
  gridConfig: [
    {
      label: '结算单号',
      prop: 'settleNo',
      render: (h, params) => {
        return h(
          'span', {'class': 'tab-color' }, params.row.settleNo
        )
      }
    },
    {
      label: '创建时间',
      prop: 'createTime',
    },
    {
      label: '所属服务商',
      prop: 'agentName',
    },
    {
      label: '服务商ID',
      prop: 'agentNo'
    },
    {
      label: '结算后金额',
      prop: 'settleMoney'
    },
    {
      label: '发票图片',
      prop: 'settleImg',
      type: 'img'
    },
    {
      label: '开户人姓名',
      prop: 'name'
    },
    {
      label: '开户银行',
      prop: 'bankName'
    },
    {
      label: '银行卡号',
      prop: 'bankNo'
    },
    {
      label: '结算状态',
      prop: 'status',
      render: (h, params) => {
        if (params.row.status === 0) {
          return [h('span', {
            'class': "dot " + "reject"
          }), '驳回']
        } else if (params.row.status === 1) {
          return [h('span', {
            'class': "dot " + "opened"
          }), '待处理']
        } else if (params.row.status === 2) {
          return [h('span', {
            'class': "dot " + "success"
          }), '成功']
        }
      }
    },
    {
      label: '结算时间',
      prop: 'settleTime'
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
        name: '驳回',
        emitName: 'reject',
        type: 'text',
        isShow: ($row) => {
          return $row.status === 1 ? true : false
        }
      },
      {
        name: '通过',
        emitName: 'pass',
        type: 'text',
        isShow: ($row) => {
          return $row.status === 1 ? true : false
        }
      }
    ]
  }
};

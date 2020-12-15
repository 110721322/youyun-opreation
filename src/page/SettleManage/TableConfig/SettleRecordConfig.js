export const SETTLE_RECORD_CONFIG = {
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
      label: '所属商户',
      prop: 'merchantName'
    },
    {
      label: '结算门店',
      prop: 'shopName'
    },
    {
      label: '结算通道',
      prop: 'settleChannel'
    },
    {
      label: '结算金额(元)',
      prop: 'settleAmount'
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
      label: '支付状态',
      prop: 'status',
      render: (h, params) => {
        if (params.row.status === 0) {
          return [h('span', {
            'class': "dot " + "reject"
          }), '失败']
        } else if (params.row.status === 1) {
          return [h('span', {
            'class': "dot " + "opened"
          }), '结算中']
        } else if (params.row.status === 2) {
          return [h('span', {
            'class': "dot " + "success"
          }), '成功']
        }
      }
    },
    {
      label: '处理时间',
      prop: 'settleTime'
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
    view: false
  }
};

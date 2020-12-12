export const MERCHANT_LIST_CONFIG = {
  gridConfig: [
    {
      label: '商户ID',
      prop: 'merchantNo',
      render: (h, params) => {
        return h(
          'span', {'class': 'tab-color' }, params.row.merchantNo
        )
      }
    },
    {
      label: '所属服务商',
      prop: 'agentName',
    },
    {
      label: '商户昵称',
      prop: 'merchantName',
    },
    {
      label: '手机号',
      prop: 'phone'
    },
    {
      label: '门店数量',
      prop: 'merchantNum'
    },
    {
      label: '状态',
      prop: 'status',
      render: (h, params) => {
        if (params.row.status === 0) {
          return [h('span', {
            'class': "dot " + "reject"
          }), '禁用']
        } else if (params.row.status === 1) {
          return [h('span', {
            'class': "dot " + "opened"
          }), '启用']
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
        name: '商户后台',
        emitName: 'goMerchant',
        type: 'text'
      }
    ]
  }
};

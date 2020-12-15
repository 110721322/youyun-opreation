export const MERCHANT_DETAIL_CONFIG = {
  gridConfig: [
    {
      label: '门店ID',
      prop: 'shopId',
      render: (h, params) => {
        return h(
          'span', {'class': 'tab-color' }, params.row.shopId
        )
      }
    },
    {
      label: '门店名称',
      prop: 'shopName',
    },
    {
      label: '门店类目',
      prop: 'merchantCategory',
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
      prop: 'shopStatus',
      render: (h, params) => {
        if (params.row.shopStatus === 0) {
          return h('div', {'class': 'tab-reject'},[h('span', {'class': "dot " + "reject"}), '禁用'])
        } else if (params.row.shopStatus === 1) {
          return [h('span', {
            'class': "dot " + "opened"
          }), '启用']
        }
      }
    },
    {
      label: '审核状态',
      prop: 'status',
      render: (h, params) => {
        if (params.row.status === 0) {
          return h('div', {'class': 'tab-reject'},[h('span', {'class': "dot " + "reject"}), '驳回'])
        } else if (params.row.status === 1) {
          return [h('span', {
            'class': "dot " + "audit"
          }), '服务商审核中']
        } else if (params.row.status === 2) {
          return [h('span', {
            'class': "dot " + "audit"
          }), '通道审核中']
        } else if (params.row.status === 3) {
          return [h('span', {
            'class': "dot " + "opened"
          }), '已开通']
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
        name: '门店后台',
        emitName: 'goMerchant',
        type: 'text'
      }
    ]
  }
};

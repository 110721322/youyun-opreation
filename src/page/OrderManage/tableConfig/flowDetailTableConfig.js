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
      prop: 'tradeType'
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
        if (params.row.orderStatus === 0) {
          return h(
            'span', '待支付'
          )
        }
        if (params.row.orderStatus === 1) {
          return h(
            'span', '支付中'
          )
        }
        if (params.row.orderStatus === 2) {
          return h(
            'span', '支付成功'
          )
        }
        if (params.row.orderStatus === 3) {
          return h(
            'span', '交易关闭'
          )
        }
        if (params.row.orderStatus === 4) {
          return h(
            'span', '部分退款'
          )
        }
        if (params.row.orderStatus === 5) {
          return h(
            'span', '全部退款'
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

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
    // {
    //   label: '设备类型',
    //   prop: 'diviceType'
    // },
    // {
    //   label: '设备SN',
    //   prop: 'deviceSN'
    // },
    {
      label: '实收（退）金额',
      prop: 'tradeAmount'
    },
    {
      label: '交易状态',
      prop: 'orderStatusCN'
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

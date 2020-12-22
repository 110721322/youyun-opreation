export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '订单号',
      prop: 'orderNo'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    },
    {
      label: '所属服务商',
      prop: 'agentName'
    },
    {
      label: '所属商户',
      prop: 'merchantName'
    },
    {
      label: '支付门店',
      prop: 'shopName'
    },
    // {
    //   label: '设备类型',
    //   prop: 'shopName'
    // },
    {
      label: '支付方式',
      prop: 'payWayName'
    },
    {
      label: '实收（退）金额',
      prop: 'actualAmount'
    },
    {
      label: '服务商分润',
      prop: 'benefitAmount'
    },
    {
      label: '平台分润',
      prop: 'platformCommission'
    },
    {
      label: '手续费',
      prop: 'serviceFee'
    },
    {
      label: '交易类型',
      prop: 'tradeType'
    },
    {
      label: '交易状态',
      prop: 'orderStatusName'
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
        emitName: 'detail',
        type: 'text'
      }
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
  hideEditArea: false
};

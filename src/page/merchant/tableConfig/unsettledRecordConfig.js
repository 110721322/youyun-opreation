export const UNEWTTLED_CONFIG = {
  gridConfig: [
    {
      label: '商户',
      prop: [{ key: 'merchantName' }, { key: 'merchantNo', label: 'ID:' }],
      width: '150px'
    },
    {
      label: '交易通道',
      prop: [{ key: 'channelName' }, { key: 'channelMerchantNo', label: '商户号:' }],
      width: '150px'
    },
    {
      label: '交易日期',
      prop: 'tradeDate',
      width: '150px'
    },
    {
      label: '结算日期',
      prop: 'settleDate',
      width: '150px'
    },
    {
      label: '结算金额（元）',
      prop: 'totalSettleAmount',
      width: '150px'
    },
    {
      label: '交易金额（元）',
      prop: 'totalActualAmount',
      width: '150px'
    },
    {
      label: '手续费（元）',
      prop: 'totalServiceFee',
      width: '150px'
    }

  ],
  // crud的模态框表单配置，可配置表单类型，验证规则，是否必填,col-span布局可通过span参数配置

  // crud的操作按钮配置，基础按钮有添加、修改、删除、查看，还可以配置扩展按钮
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
      },
      {
        name: '服务商后台',
        emitName: 'download',
        type: 'text'
      },
      {
        name: '商户后台',
        emitName: 'download',
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
  }
};

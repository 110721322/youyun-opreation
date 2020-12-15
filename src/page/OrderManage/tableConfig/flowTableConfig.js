export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '订单号',
      prop: 'shopNo'
    },
    {
      label: '创建时间',
      prop: 'shopNo'
    },
    {
      label: '所属服务商',
      prop: 'shopNo'
    },
    {
      label: '所属商户',
      prop: 'shopName'
    },
    {
      label: '支付门店',
      prop: 'shopName'
    },
    {
      label: '设备类型',
      prop: 'shopName'
    },
    {
      label: '支付方式',
      prop: 'shopName'
    },
    {
      label: '实收（退）金额',
      prop: 'shopName'
    },
    {
      label: '服务商分润',
      prop: 'shopName'
    },
    {
      label: '平台分润',
      prop: 'shopName'
    },
    {
      label: '手续费',
      prop: 'address'
    },
    {
      label: '交易类型',
      prop: 'contacter'
    },
    {
      label: '交易状态',
      prop: 'phone'
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

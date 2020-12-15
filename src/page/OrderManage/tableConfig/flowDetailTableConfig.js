export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '订单号',
      prop: 'shopNo'
    },
    {
      label: '交易时间',
      prop: 'shopNo'
    },
    {
      label: '交易类型',
      prop: 'shopNo'
    },
    {
      label: '设备类型',
      prop: 'shopName'
    },
    {
      label: '设备SN',
      prop: 'shopName'
    },
    {
      label: '实收（退）金额',
      prop: 'shopName'
    },
    {
      label: '交易状态'
    },
    {
      label: '操作员',
      prop: 'shopName'
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

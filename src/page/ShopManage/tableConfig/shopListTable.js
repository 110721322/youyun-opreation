export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '门店ID',
      prop: 'shopNo'
    },
    {
      label: '所属服务商',
      prop: 'shopNo'
    },
    {
      label: '所属商户',
      prop: 'shopNo'
    },
    {
      label: '门店名称',
      prop: 'shopName'
    },
    {
      label: '门店类目',
      prop: 'shopName'
    },
    {
      label: 'logo或门头照',
      prop: 'shopName'
    },
    {
      label: '服务电话',
      prop: 'shopName'
    },
    {
      label: '设备数量',
      prop: 'shopName'
    },
    {
      label: '门店地址',
      prop: 'address'
    },
    {
      label: '门店状态',
      prop: 'contacter'
    },
    {
      label: '审核状态',
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

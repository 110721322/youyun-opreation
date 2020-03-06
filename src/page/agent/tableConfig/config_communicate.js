export const USER_CONFIG = {
  gridConfig: [
    {
      label: '待沟通时间',
      prop: 'id',
      width: '150px'
    },
    {
      label: '联系人',
      prop: 'tel',
      width: '150px'
    },
    {
      label: '联系电话',
      prop: 'email',
      width: '150px'
    },
    {
      label: '备注',
      prop: 'name',
      width: '150px'
    },
    {
      label: '商户数量',
      prop: 'name',
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

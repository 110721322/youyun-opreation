export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '信息类型',
      prop: 'service',
      width: '150px'
    },
    {
      label: '内容',
      prop: 'merchant',
      width: '150px'
    },
    {
      label: '加入人员',
      prop: 'time',
      width: '150px'
    },
    {
      label: '加入黑名单时间',
      prop: 'oper',
      width: '150px'
    },
    {
      label: '被拦截服务商',
      prop: 'status',
      // prop: [{ key: 'service' }, { key: 'serviceid', label: "ID:" }],
      width: '150px'
    },
    {
      label: '拦截时间',
      prop: 'status',
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

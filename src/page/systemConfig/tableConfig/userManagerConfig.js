
export const USERLIST_CONFIG = {
  gridConfig: [
    {
      label: '花名',
      prop: 'type',
      width: '150px'
    },
    {
      label: '工号',
      prop: 'taskName',
      width: '150px'
    },
    {
      label: '姓名',
      prop: 'image',
      width: '150px'
    },
    {
      label: '职位',
      prop: 'image',
      width: '150px'
    },
    {
      label: '上级',
      prop: 'image',
      width: '150px'
    },
    {
      label: '手机号',
      prop: 'time',
      width: '150px'
    },
    {
      label: '性别',
      prop: 'time',
      width: '150px'
    },
    {
      label: '创建时间',
      prop: 'time',
      width: '150px'
    },
    {
      label: '邮箱',
      prop: 'time',
      width: '150px'
    },
    {
      label: '状态',
      prop: 'time',
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
        name: '完善岗位信息',
        emitName: 'perfect',
        type: 'text'
      },
      {
        name: '编辑基础信息',
        emitName: 'editBasics',
        type: 'text'
      },
      {
        name: '编辑岗位信息',
        emitName: 'editPost',
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

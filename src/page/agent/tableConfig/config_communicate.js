export const USER_CONFIG = {
  gridConfig: [
    {
      label: '沟通时间',
      prop: 'createTime',
      width: '150px'
    },
    {
      label: '沟通人',
      prop: 'linkmanName',
      width: '150px'
    },
    {
      label: '联系电话',
      prop: 'phoneNum',
      width: '150px'
    },
    {
      label: '备注',
      prop: 'remark',
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
export const USER_CONFIG2 = {
  gridConfig: [
    {
      label: '沟通时间',
      prop: 'createTime',
      width: '150px'
    },
    {
      label: '沟通人',
      prop: 'linkmanName',
      width: '150px'
    },
    {
      label: '沟通主题',
      prop: 'theme',
      width: '150px'
    },
    {
      label: '沟通副主题',
      prop: 'subTheme',
      width: '150px'
    },
    {
      label: '沟通内容',
      prop: 'content',
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

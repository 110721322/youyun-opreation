export const USER_CONFIG = {
  gridConfig: [
    {
      label: '序号',
      prop: 'id',
      width: '82px'
    },
    {
      label: '标题',
      prop: 'title',
      width: '406px'
    },
    {
      label: '消息类型',
      prop: 'type',
      width: '150px'
    },
    {
      label: '提交时间',
      prop: 'time',
      width: '227px'
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
        name: '编辑',
        emitName: 'edit',
        type: 'text'
      },
      {
        name: '删除',
        emitName: 'delete',
        type: 'text',
        style: 'color:#F5222D'
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

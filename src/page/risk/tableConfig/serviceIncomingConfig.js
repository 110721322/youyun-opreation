export const SERVICEINCOMING_CONFIG = {
  gridConfig: [
    {
      label: '服务商',
      prop: [{ key: 'agentName' }, { key: 'agentNo', label: "ID:" }],
      width: '150px'
    },
    {
      label: '所属顶级服务商',
      prop: [{ key: 'parentAgentName' }, { key: 'parentAgentNo', label: "ID:" }],
      width: '150px'
    },
    {
      label: '商户数量（个）',
      prop: 'merchantCount',
      width: '150px'
    },
    {
      label: '所属运营',
      prop: 'operateUserName',
      width: '150px'
    },
    {
      label: '加入时间',
      prop: 'createTime',
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
        name: '移出',
        emitName: 'remove',
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
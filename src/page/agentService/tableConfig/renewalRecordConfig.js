export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '服务商',
      prop: [{ key: 'agentName' }, { key: 'agentNo', label: "ID:" }],
      width: '150px'
    },
    {
      label: '续费时间',
      prop: 'createTime',
      width: '100px'
    },
    {
      label: '开通时间',
      prop: 'createTime',
      width: '100px'
    },
    {
      label: '最近到期时间',
      prop: 'createTime',
      width: '130px'
    },
    {
      label: '续费时长（年）',
      prop: 'renewYear',
      width: '130px'
    },
    {
      label: '支付方式',
      prop: 'pay',
      width: '100px'
    },
    {
      label: '状态',
      prop: 'auditStatus',
      width: '100px'
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
        name: '服务商信息',
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

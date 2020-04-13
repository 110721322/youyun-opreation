export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '工单编号',
      prop: 'workerOrderNo',
      width: '100px'
    },
    {
      label: '服务商',
      prop: [{ key: 'agentName' }, { key: 'agentNo', label: "ID:" }],
      width: '150px'
    },
    {
      label: '问题模块',
      prop: 'questionModule',
      width: '130px'
    },
    {
      label: '问题类型',
      prop: 'questionType',
      width: '130px'
    },
    {
      label: '问题内容',
      prop: 'questionContent',
      width: '150px'
    },
    {
      label: '状态',
      prop: 'status',
      width: '80px'
    },
    {
      label: '优先级',
      prop: 'priority',
      width: '80px'
    },
    {
      label: '处理人员',
      prop: 'operatorName',
      width: '80px'
    },
    {
      label: '提交时间',
      prop: 'createTime',
      width: '150px'
    },
    {
      label: '处理时长',
      prop: 'disposeTime',
      width: '100px'
    },
    {
      label: '评分',
      prop: 'grade',
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
      },
      {
        name: '分配',
        emitName: 'distribution',
        type: 'text'
      },
      {
        name: '回复',
        emitName: 'reply',
        type: 'text'
      },
      {
        name: '查看回复',
        emitName: 'checkReply',
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

export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '成员',
      prop: 'operatorName',
      width: '100px'
    },
    {
      label: '工单数量',
      prop: 'orderNum',
      width: '100px',
      sortable: "custom"
    },
    {
      label: '工单完成数量',
      prop: 'orderSuccessNum',
      width: '150px',
      sortable: "custom"
    },
    {
      label: '完成率',
      prop: 'completionRate',
      width: '130px',
      sortable: "custom"
    },
    {
      label: '平均完成时长',
      prop: 'completionAvgTime',
      width: '150px',
      sortable: "custom"
    },
    {
      label: '评分',
      prop: 'score',
      width: '150px',
      sortable: "custom"
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
  },
  hideEditArea: false
};

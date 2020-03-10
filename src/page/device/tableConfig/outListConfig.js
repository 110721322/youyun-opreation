export const OUTLIST_CONFIG = {
  gridConfig: [
    {
      label: '订单号',
      prop: 'type',
      width: '150px'
    },
    {
      label: '订购时间',
      prop: 'taskName',
      width: '150px'
    },
    {
      label: '购买服务商',
      prop: 'taskName',
      width: '150px'
    },
    {
      label: '状态',
      prop: 'time',
      width: '150px'
    },
    {
      label: '销售人员',
      prop: 'time',
      width: '150px'
    },
    {
      label: '出库人员',
      prop: 'time',
      width: '150px'
    },
    {
      label: '设备型号',
      prop: 'time',
      width: '150px'
    },
    {
      label: '订购（台）',
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
        name: '详情',
        emitName: 'detail',
        type: 'text'
      },
      {
        name: '发货',
        emitName: 'send',
        type: 'text'
      },
      {
        name: '分配',
        emitName: 'distribution',
        type: 'text'
      },
      {
        name: '驳回',
        emitName: 'adopt',
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
  },
  hideEditArea: false
};

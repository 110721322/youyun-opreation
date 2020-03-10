export const USAGELIST_CONFIG = {
  gridConfig: [
    {
      label: '设备型号',
      prop: 'type',
      width: '150px'
    },
    {
      label: '设备标识',
      prop: 'taskName',
      width: '150px'
    },
    {
      label: '所属商户',
      prop: 'taskName',
      width: '150px'
    },
    {
      label: '所属服务商',
      prop: 'time',
      width: '150px'
    },
    {
      label: '创建时间',
      prop: 'time',
      width: '150px'
    },
    {
      label: '设备状态',
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
        name: '解绑',
        emitName: 'distribution',
        type: 'text'
      },
      {
        name: '恢复可用',
        emitName: 'adopt',
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

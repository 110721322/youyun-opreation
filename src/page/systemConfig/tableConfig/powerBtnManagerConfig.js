
export const POWERBTNMANAGER_CONFIG = {
  gridConfig: [
    {
      label: '按钮名称',
      prop: 'type',
      width: '50px'
    },
    {
      label: '按钮链接',
      prop: 'type',
      width: '50px'
    },
    {
      label: '关闭权限效果',
      prop: 'type',
      width: '50px'
    },
    {
      label: '审批操纵',
      prop: 'type',
      width: '50px'
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
        emitName: 'delet',
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

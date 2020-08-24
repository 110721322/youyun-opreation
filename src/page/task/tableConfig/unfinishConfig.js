export const UNFINISH_CONFIG = {
  gridConfig: [
    {
      label: '任务类型',
      prop: 'undoType',
      width: '150px',
      render: (h, params) => {
        if (params.row.undoType === 1) {
          return h(
            'span', '日常任务'
          )
        }
        if (params.row.undoType === 2) {
          return h(
            'span', '审批任务'
          )
        }
      }
    },
    {
      label: '任务名称',
      prop: 'taskValue',
      width: '150px'
    },
    {
      label: '任务数量',
      prop: 'count',
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
        name: '提醒',
        emitName: 'remind',
        type: 'text',
        style: 'color:#1989FA'
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
}

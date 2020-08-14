export const UNFINISH_CONFIG = {
  gridConfig: [
    {
      label: '成员',
      prop: 'receiverName',
      width: '150px'
    },
    {
      label: '日常任务数量',
      prop: 'normalTotalCount',
      width: '150px'
    },
    {
      label: '日常任务完成数量',
      prop: 'normalDoneCount',
      width: '150px'
    },
    {
      label: '日常任务完成率',
      prop: 'normalDoneRate',
      width: '150px'
    },
    {
      label: '单个日常任务平均完成时间',
      prop: 'normalAverageUsedTime',
      width: '200px'
    },
    {
      label: '审批任务数量',
      prop: 'approvalTotalCount',
      width: '200px'
    },
    {
      label: '审批任务完成率',
      prop: 'approvalDoneRate',
      width: '200px'
    },
    {
      label: '单个审批任务完成时间',
      prop: 'approvalAverageUsedTime',
      width: '200px'
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

export const SERVICE_CONFIG = {
  gridConfig: [
    {
      label: '返佣月份',
      prop: 'time'
    },
    {
      label: '交易金额',
      prop: 'money'
    },
    {
      label: '总佣金',
      prop: 'commission'
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
  }
}

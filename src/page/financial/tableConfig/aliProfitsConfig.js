export const SERVICE_CONFIG = {
  gridConfig: [
    {
      label: '业务周期',
      prop: 'time'
    },
    {
      label: '服务商',
      prop: 'topSrevice'
    },
    {
      label: '结算金额',
      prop: 'amount'
    },
    {
      label: '有效实名商户',
      prop: 'user'
    },
    {
      label: '有效交易笔数',
      prop: 'total'
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
        name: '明细',
        emitName: 'detail',
        type: 'text'
      }
    ]
  }
};

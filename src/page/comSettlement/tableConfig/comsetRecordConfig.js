export const RECORD_CONFIG = {
  gridConfig: [
    {
      label: '结算创建时间',
      prop: 'createTime'
    },
    {
      label: '结算金额',
      prop: 'actualAmount'
    },
    {
      label: '结算类型',
      prop: 'settleType'
    },
    {
      label: '结算状态',
      prop: 'settleStatusName'
    },
    {
      label: '驳回原因',
      prop: 'rejectReason'
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
        name: '查看',
        emitName: 'detail',
        type: 'text'
      }
    ]
  }
};

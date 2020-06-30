export const SERVICE_CONFIG = {
  gridConfig: [
    {
      label: '奖励核算时间',
      prop: 'time'
    },
    {
      label: '商户名称',
      prop: 'topSrevice'
    },
    {
      label: '商户PID',
      prop: 'amount'
    },
    {
      label: '业务周期（时间）',
      prop: 'user'
    },
    {
      label: '有效交易金额',
      prop: 'total'
    },
    {
      label: '有效交易笔数',
      prop: 'total'
    },
    {
      label: '结算金额',
      prop: 'amount'
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
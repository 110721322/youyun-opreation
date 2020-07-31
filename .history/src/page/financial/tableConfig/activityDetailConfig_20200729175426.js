export const SERVICE_CONFIG = {
  gridConfig: [
    {
      label: '奖励核算时间',
      prop: 'time'
    },
    {
      label: '商户名称',
      prop: 'merchantName'
    },
    {
      label: '结算主体(蜻蜓SN码)',
      prop: 'dragonflySn'
    },
    {
      label: '业务周期(时间)',
      prop: 'rewardDate'
    },
    {
      label: '有效实名用户数',
      prop: 'validRealUserNum'
    },
    {
      label: '有效交易笔数',
      prop: 'validDealNum'
    },
    {
      label: '奖励金额',
      prop: 'rewardAmount'
    }
  ],
  // crud的模态框表单配置，可配置表单类型，验证规则，是否必填,col-span布局可通过span参数配置

  // crud的操作按钮配置，基础按钮有添加、修改、删除、查看，还可以配置扩展按钮
  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: []
  }
}

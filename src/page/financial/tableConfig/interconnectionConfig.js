export const SERVICE_CONFIG = {
  gridConfig: [
    {
      label: '通道名称',
      prop: 'payChannel'
    },
    {
      label: '总流水',
      prop: 'tradeAmount'
    },
    {
      label: '官方分润',
      prop: 'ourCommission'
    },
    {
      label: '代理商分润',
      prop: 'agentCommission'
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
};

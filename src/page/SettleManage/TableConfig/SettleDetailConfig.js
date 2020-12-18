export const SETTLE_DETAIL_CONFIG = {
  gridConfig: [
    {
      label: '佣金月份',
      prop: 'tradeMonth'
    },
    {
      label: '佣金类别',
      prop: 'settleTypeDesc',
    },
    {
      label: '服务商',
      prop: 'agentName',
    },
    {
      label: '应结佣金',
      prop: 'settleAmount'
    }
  ],


  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false
  }
};

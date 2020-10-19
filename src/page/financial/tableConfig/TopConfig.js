export const TOPERVICE_CONFIG = {
  gridConfig: [
    {
      label: '顶级服务商',
      prop: [{key: "channelAgentName"}, {key: "channelAgentCode"}],
      width: '90px'
    },
    {
      label: '联系人',
      prop: 'contact',
      width: '90px'
    },
    {
      label: '结算账号',
      prop: [{ key: "settleBankName" }, { key: "settleAccount"}],
      width: '90px'
    },
    {
      label: '结算总额',
      prop: 'totalCommission',
      width: '90px'
    },
    {
      label: '支付宝',
      prop: 'alipayCommission',
      width: '90px'
    },
    {
      label: '微信',
      prop: 'wechatCommission'
    },
    {
      label: '云闪付',
      prop: 'cloudPayCommission'
    },
    // {
    //   label: '银联',
    //   prop: 'unionpayTradeAmount'
    // },
    {
      label: '活动',
      prop: 'activityReward'
    },
    {
      label: '结算状态',
      prop: 'activityReward'
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
};

export const SERVICE_CONFIG = {
  gridConfig: [
    {
      label: '商户ID',
      prop: [{ key: 'merchantName'}, {key: 'merchantNo', label: 'ID:'}]
    },
    {
      label: '所属服务商',
      prop: 'agentName'
    },
    {
      label: '所属合伙人',
      prop: 'partnerName'
    },
    {
      label: '支付宝佣金(元)',
      prop: 'alipayCommission'
    },
    {
      label: '微信佣金(元)',
      prop: 'wechatCommission'
    },
    {
      label: '云闪付佣金(元)',
      prop: 'cloudPayCommission'
    },
    {
      label: '银联佣金(元)',
      prop: 'unionpayCommission'
    },
    {
      label: '总佣金(元)',
      prop: 'totalCommission'
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

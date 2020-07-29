export const SERVICE_CONFIG = {
  gridConfig: [
    {
      label: '服务商',
      prop: 'service',
      width: '90px',
      value: 'sgdgfvs'
    },
    {
      label: '所属上级服务商',
      prop: 'topSrevice',
      width: '90px'
    },
    {
      label: '联系人',
      prop: 'call',
      width: '90px'
    },
    {
      label: '结算账号',
      prop: [{key: 'brand'}, {key: 'bankNum'}],
      // prop: [{ key: "name" }, { key: "phone"}],
      width: '90px'
    },
    {
      label: '结算总额',
      prop: 'total',
      width: '90px'
    },
    {
      label: '支付宝',
      prop: 'aply',
      width: '90px'
    },
    {
      label: '微信',
      prop: 'weChat'
    },
    {
      label: '云闪付',
      prop: 'yun'
    },
    {
      label: '银联',
      prop: 'unionPay'
    },
    {
      label: '活动',
      prop: 'active'
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

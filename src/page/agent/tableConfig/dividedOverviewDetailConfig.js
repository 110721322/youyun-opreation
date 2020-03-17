export const USER_CONFIG = {
  gridConfig: [
    {
      label: '商户',
      prop: [{ key: 'merchantName' }, { key: 'id', label: 'ID:' }],
      width: '150px'
    },
    {
      label: '分润总额（元）',
      prop: 'totalCommission',
      width: '130px'
    },
    {
      label: '支付宝分润（元）',
      prop: 'aliDivided',
      width: '140px'
    },
    {
      label: '微信分润（元）',
      prop: 'wxDivided',
      width: '130px'
    },
    {
      label: '云闪付分润（元）',
      prop: 'yunDivided',
      width: '140px'
    },
    {
      label: '银联分润（元）',
      prop: 'yinDivided',
      width: '130px'
    },
    {
      label: '官方活动奖励（元）',
      prop: 'officeReward',
      width: '150px'
    },
    {
      label: '平台活动奖励（元）',
      prop: 'platformReward',
      width: '150px'
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
  },
  // 表单基础数据类型，需要预先赋值
  formModel: {
    id: '',
    tel: '',
    name: '',
    email: '',
    status: '',
    create_time: '',
    expand: '',
    roleIdList: []
  }
};

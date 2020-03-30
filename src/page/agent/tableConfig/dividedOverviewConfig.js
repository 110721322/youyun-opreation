export const USER_CONFIG = {
  gridConfig: [
    {
      label: '服务商',
      prop: [{ key: 'agentName' }, { key: 'agentNo', label: 'ID:' }],
      width: '150px'
    },
    {
      label: '佣金总额（元）',
      prop: 'totalCommission',
      width: '150px',
      sortable: "custom"
    },
    {
      label: '服务商订单分润（元）',
      prop: 'orderDistribution',
      width: '170px',
      sortable: "custom"
    },
    {
      label: '官方活动奖励（元）',
      prop: 'officeActivity',
      width: '170px',
      sortable: "custom"
    },
    {
      label: '平台活动奖励（元）',
      prop: 'platformActivity',
      width: '170px',
      sortable: "custom"
    },
    {
      label: '佣金总额环比增长',
      prop: 'ratio',
      width: '170px',
      sortable: "custom"
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

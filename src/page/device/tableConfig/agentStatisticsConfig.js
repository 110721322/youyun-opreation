export const AGENTSTA_CONFIG = {
  gridConfig: [
    {
      label: '服务商',
      prop: [{ key: 'agentName' }, { key: 'agentNo', label: 'ID:' }],
      width: '150px'
    },
    {
      label: '设备型号',
      prop: 'deviceModel',
      width: '150px'
    },
    {
      label: '购买数量（台）',
      prop: 'buyCount',
      width: '150px'
    },
    {
      label: '购买数量环比|同比',
      prop: [{ key: 'buyCycleRatio', label: '环比:' }, { key: 'buyYearRatio', label: '同比:' }],
      width: '150px'
    },
    {
      label: '激活数量（台）',
      prop: 'activationCount',
      width: '150px'
    },
    {
      label: '激活数量环比|同比',
      prop: [{ key: 'activationCycleRatio', label: '环比:' }, { key: 'activationYearRatio', label: '同比:' }],
      width: '150px'
    },
    {
      label: '交易金额环比|同比',
      prop: [{ key: 'tradeAmountCycleRatio', label: '环比:' }, { key: 'tradeAmountYearRatio', label: '同比:' }],
      width: '150px',
      isFixed: "right"
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
  },
  hideEditArea: true
};

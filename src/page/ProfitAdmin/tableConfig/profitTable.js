export const SHOP_PROFIT = {
  gridConfig: [
    {
      label: '排名',
      prop: 'shopNo'
    },
    {
      label: '所属服务商',
      prop: 'agentName'
    },
    {
      label: '所属商户',
      prop: 'merchantName'
    },
    {
      label: '门店名称',
      prop: 'shopName'
    },
    {
      label: '本月分润',
      prop: 'shopNo',
      sortable: true
    },
    {
      label: '分润总额',
      prop: 'agentName'
    }
  ],

  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: []
  },
  // 表单基础数据类型，需要预先赋值
  formModel: {
  },
  hideEditArea: true
};
export const MERCHANT_PROFIT = {
  gridConfig: [
    {
      label: '排名',
      prop: 'shopNo'
    },
    {
      label: '所属服务商',
      prop: 'agentName'
    },
    {
      label: '所属商户',
      prop: 'merchantName'
    },
    {
      label: '本月分润',
      prop: 'shopNo',
      sortable: true
    },
    {
      label: '分润总额',
      prop: 'agentName'
    }
  ],

  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: []
  },
  // 表单基础数据类型，需要预先赋值
  formModel: {
  },
  hideEditArea: true
};
export const AGENT_PROFIT = {
  gridConfig: [
    {
      label: '排名',
      prop: 'shopNo'
    },
    {
      label: '所属服务商',
      prop: 'agentName'
    },
    {
      label: '本月分润',
      prop: 'shopNo',
      sortable: true
    },
    {
      label: '分润总额',
      prop: 'agentName'
    }
  ],

  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: []
  },
  // 表单基础数据类型，需要预先赋值
  formModel: {
  },
  hideEditArea: true
};

export const INFO_LIST = [
  {
    span: 8,
    style: 'height: 168px;',
    label: '本月佣金金额（元）',
    icon: 'iconyue',
    iconStyle: 'color: #1989FA;',
    tooltip: '',
    value: '126,560.00',
    children: [
      {
        label: '上月分润金额',
        value: '¥12,423.00'
      }
    ],
    slotName: 'monthComission'
  },
  {
    span: 8,
    style: 'height: 168px;',
    label: '今日分润金额（元）',
    icon: 'iconshuliang',
    iconStyle: 'color: #1989FA;',
    tooltip: '',
    value: '126,560.00',
    children: [
      {
        label: '昨日分润金额',
        value: '¥12,423.00'
      }
    ],
    slotName: 'todayComission'
  },
  {
    span: 8,
    style: 'height: 168px;margin-right: 0;',
    label: '佣金总额（元）',
    icon: 'iconfenzhang',
    iconStyle: 'color: #EFA911;',
    tooltip: '',
    value: '126,560.00',
    children: []
  }
]

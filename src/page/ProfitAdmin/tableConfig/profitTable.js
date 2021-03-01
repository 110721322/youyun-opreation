export const SHOP_PROFIT = {
  gridConfig: [
    {
      label: '排名',
      prop: 'rank',
      render: (h, params) => {
        const rank = params.index + 1;
        return (
          <span class={[rank <= 3 ? "m-rank m-top" : 'm-rank']}>{ rank }</span>
        )
      },
      width: '60px'
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
      prop: 'currMonthTopAgentCommission',
      sortable: true
    },
    {
      label: '分润总额',
      prop: 'totalTopAgentCommission'
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
      prop: 'rank',
      render: (h, params) => {
        const rank = params.index + 1;
        return (
          <span class={[rank <= 3 ? "m-rank m-top" : 'm-rank']}>{ rank }</span>
        )
      },
      width: '60px'
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
      prop: 'currMonthTopAgentCommission',
      sortable: true
    },
    {
      label: '分润总额',
      prop: 'totalTopAgentCommission'
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
      prop: 'rank',
      render: (h, params) => {
        const rank = params.index + 1;
        return (
          <span class={[rank <= 3 ? "m-rank m-top" : 'm-rank']}>{ rank }</span>
        )
      },
      width: '60px'
    },
    {
      label: '所属服务商',
      prop: 'agentName'
    },
    {
      label: '本月分润',
      prop: 'currMonthTopAgentCommission',
      sortable: true
    },
    {
      label: '分润总额',
      prop: 'totalTopAgentCommission'
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
    style: 'height: 137px;',
    label: '本月佣金金额（元）',
    icon: 'iconyue',
    iconStyle: 'color: #1989FA;',
    tooltip: '',
    key: 'currMonthCommission',
    value: '0',
    children: [
      {
        label: '上月佣金金额',
        key: 'lastMonthCommission',
        formatter($params) {
          return '¥' + $params.lastMonthCommission
        },
        value: null
      }
    ]
  },
  {
    span: 8,
    style: 'height: 137px;',
    label: '昨日佣金金额（元）',
    icon: 'iconjin',
    iconStyle: 'color: #65CC30;',
    tooltip: '',
    key: 'lastDayCommission',
    value: '0',
    children: []
  },
  {
    span: 8,
    style: 'height: 137px;margin-right: 0;',
    label: '佣金总额（元）',
    icon: 'iconfenzhang',
    iconStyle: 'color: #EFA911;',
    tooltip: '',
    key: 'totalCommission',
    value: '0',
    children: []
  }
]

export const ECHARTS_BAR_CONFIG = {
  title: {
    text: '订单佣金',
    textStyle: {
      fontSize: 14,
      color: '#333335',
      fontWeight: 400
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  color : '#1890FF',
  series: [
    {
      name: '订单佣金',
      type: 'bar',
      barWidth: '30',
      data: [],
      id: 'topAgentCommission'
    }
  ]
}

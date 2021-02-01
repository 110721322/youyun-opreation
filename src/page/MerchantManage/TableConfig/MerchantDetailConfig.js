export const MERCHANT_DETAIL_CONFIG = {
  gridConfig: [
    {
      label: '门店ID',
      prop: 'shopNo',
      render: (h, params) => {
        return h(
          'span', {'class': 'tab-color' }, params.row.shopNo
        )
      }
    },
    {
      label: '门店名称',
      prop: 'shopName',
    },
    {
      label: '门店类目',
      prop: 'mccCodeCN',
    },
    {
      label: 'logo或门头照',
      prop: 'shopImg',
      render: (h, params) => {
        const imgUrl = params.row.shopImg;
        return h('el-image', {
          props: {
            src: imgUrl,
            'preview-src-list': [imgUrl]
          }
        }, '正常');
      }
    },
    {
      label: '服务电话',
      prop: 'phone'
    },
    {
      label: '门店地址',
      prop: 'address'
    },
    {
      label: '门店状态',
      prop: 'isDisabled',
      render: (h, params) => {
        const actions = new Map([
          [0, {className: 's-status-success', statusDesc: '启用'}],
          [1, {className: 's-status-fail', statusDesc: '禁用'}],
          ['default', {className: 's-status-pending', statusDesc: '等待'}],
        ])
        const action = actions.get(params.row.isDisabled) || actions.get('default')
        return (
          <span class={['flex-align-center', 'g-status-icon', 's-status-radius', action.className]}>{ action.statusDesc }</span>
      )
      }
    },
    {
      label: '审核状态',
      prop: 'status',
      render: (h, params) => {
        const actions = new Map([
          [0, {className: 's-status-pending', statusDesc: '预审核中'}],
          [1, {className: 's-status-fail', statusDesc: '平台驳回'}],
          [2, {className: 's-status-pending', statusDesc: '通道审核中'}],
          [3, {className: 's-status-fail', statusDesc: '通道驳回'}],
          [4, {className: 's-status-success', statusDesc: '通道通过'}],
          [5, {className: 's-status-pending', statusDesc: '微信审核中'}],
          [6, {className: 's-status-pending', statusDesc: '微信未认证'}],
          [7, {className: 's-status-fail', statusDesc: '微信认证拒绝'}],
          [8, {className: 's-status-success', statusDesc: '微信认证成功'}],
          ['default', {className: 's-status-pending', statusDesc: '等待'}]
        ])
        const action = actions.get(params.row.status) || actions.get('default')
        return (
          <span class={['flex-align-center', 'g-status-icon', 's-status-radius', action.className]}>{ action.statusDesc }</span>
      )
      }
    }
  ],


  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: [
      {
        name: '详情',
        emitName: 'details',
        type: 'text'
      }
    ]
  }
};

export const MERCHANT_DETAIL_STATIC = [
  {
    span: 6,
    style: 'height: 170px;',
    label: '实收总额（0笔）',
    icon: '',
    iconStyle: 'color: #50C514;',
    tooltip: '',
    key: 'realTotalAmount',
    value: '0',
    children: [
      {
        label: '昨日订单金额（0笔）',
        key: 'yesterdayRealAmount',
        value: ''
      }
    ]
  },
  {
    span: 6,
    style: 'height: 170px;',
    label: '退款总额（0笔）',
    icon: '',
    iconStyle: 'color: #1989FA;',
    tooltip: '',
    key: 'refundTotalAmount',
    value: '0',
    children: [
      {
        label: '昨日退款金额（0笔）',
        key: 'refundTotalAmount',
        value: ''
      }
    ]
  },
  {
    span: 6,
    style: 'height: 170px;',
    label: '门店数量（个）',
    icon: '',
    iconStyle: 'color: #FA6577;',
    tooltip: '',
    key: 'shopCount',
    value: '0',
    children: [
      {
        label: '昨日活跃门店（个）',
        key: 'yesterdayActiveShopCount',
        value: '',
        span: 12
      },
      {
        label: '审核中门店数（个）',
        key: 'auditShopCount',
        value: '0',
        span: 12
      }
    ]
  },
  {
    span: 6,
    style: 'height: 170px;',
    label: '设备总数（个）',
    icon: '',
    iconStyle: 'color: #FA6577;',
    tooltip: '',
    key: 'deviceNum',
    value: '0',
    children: [
      {
        label: '昨日活跃设备（台）',
        key: 'yesterdayActiveDeviceNum',
        value: '0',
        span: 12
      },
      {
        label: '待绑定设备（台）',
        key: 'unBindDeviceNum',
        value: '0',
        span: 12
      }
    ]
  }
]

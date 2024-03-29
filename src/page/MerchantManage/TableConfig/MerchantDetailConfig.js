import { MerchantList } from "@/libs/config/constant.config";
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
      prop: 'shopAddress'
    },
    {
      label: '门店状态',
      prop: 'isDisabled',
      render: (h, params) => {
        const actions = new Map([
          [MerchantList.MERCHANT_OPEN, {className: 's-status-success', statusDesc: '启用'}],
          [MerchantList.MERCHANT_DISABLED, {className: 's-status-fail', statusDesc: '禁用'}],
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
          [MerchantList.MERCHANT_AUDIT, {className: 's-status-pending', statusDesc: '预审核中'}],
          [MerchantList.PLATEFORM_REJECT, {className: 's-status-fail', statusDesc: '平台驳回'}],
          [MerchantList.CHANNEL_AUDIT, {className: 's-status-pending', statusDesc: '通道审核中'}],
          [MerchantList.CHANNEL_REJECT, {className: 's-status-fail', statusDesc: '通道驳回'}],
          [MerchantList.CHANNEL_PASS, {className: 's-status-success', statusDesc: '通道通过'}],
          [MerchantList.WECHAT_AUDIT, {className: 's-status-pending', statusDesc: '微信审核中'}],
          [MerchantList.WECHAT_UNAUTH, {className: 's-status-pending', statusDesc: '微信未认证'}],
          [MerchantList.WECHAT_REJECT, {className: 's-status-fail', statusDesc: '微信认证拒绝'}],
          [MerchantList.WECHAT_PASS, {className: 's-status-success', statusDesc: '微信认证成功'}],
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
    label: '实收总额',
    icon: '',
    iconStyle: 'color: #50C514;',
    tooltip: '',
    key: 'realTotalAmount',
    labelFormatter($params) {
      return '实收总额' + '（' + $params.realTotalCount + '笔）'
    },
    value: null,
    children: [
      {
        label: '昨日订单金额',
        key: 'yesterdayRealAmount',
        labelFormatter($params) {
          return '昨日订单金额' + '（' + $params.yesterdayRealCount + '笔）'
        },
        formatter: ($params) => {
          return '¥' + $params.yesterdayRealAmount
        },
        value: null
      }
    ]
  },
  {
    span: 6,
    style: 'height: 170px;',
    label: '退款总额',
    icon: '',
    iconStyle: 'color: #1989FA;',
    tooltip: '',
    key: 'refundTotalAmount',
    labelFormatter($params) {
      return '退款总额' + '（' + $params.refundTotalCount + '笔）'
    },
    value: null,
    children: [
      {
        label: '昨日退款金额',
        key: 'refundTotalAmount',
        labelFormatter($params) {
          return '昨日退款金额' + '（' + $params.refundTotalCount + '笔）'
        },
        formatter: ($params) => {
          return '¥' + $params.refundTotalAmount
        },
        value: null
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
    value: null,
    children: [
      {
        label: '昨日活跃门店（个）',
        key: 'yesterdayActiveShopCount',
        value: null,
        span: 12
      },
      {
        label: '审核中门店数（个）',
        key: 'auditShopCount',
        value: null,
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
    value: null,
    children: [
      {
        label: '昨日活跃设备（台）',
        key: 'yesterdayActiveDeviceNum',
        value: null,
        span: 12
      },
      {
        label: '待绑定设备（台）',
        key: 'unBindDeviceNum',
        value: null,
        span: 12
      }
    ]
  }
]

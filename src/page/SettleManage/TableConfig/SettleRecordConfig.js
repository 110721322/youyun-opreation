export const SETTLE_RECORD_CONFIG = {
  gridConfig: [
    {
      label: '结算单号',
      prop: 'settleNo',
      render: (h, params) => {
        return h(
          'span', {'class': 'tab-color' }, params.row.settleNo
        )
      }
    },
    {
      label: '创建时间',
      prop: 'createTime',
    },
    {
      label: '所属服务商',
      prop: 'agentName',
    },
    {
      label: '所属商户',
      prop: 'merchantName'
    },
    {
      label: '结算门店',
      prop: 'shopName'
    },
    {
      label: '结算通道',
      prop: 'settleChannel'
    },
    {
      label: '结算金额(元)',
      prop: 'settleAmount'
    },
    {
      label: '开户人姓名',
      prop: 'name'
    },
    {
      label: '开户银行',
      prop: 'bankName'
    },
    {
      label: '银行卡号',
      prop: 'bankNo'
    },
    {
      label: '支付状态',
      prop: 'status',
      render: (h, params) => {
        // TODO review: 状态值常量替换,语句简化
        if (params.row.status === 0) {
          return [h('span', {
            'class': "dot " + "reject"
          }), '失败']
        } else if (params.row.status === 1) {
          return [h('span', {
            'class': "dot " + "opened"
          }), '结算中']
        } else if (params.row.status === 2) {
          return [h('span', {
            'class': "dot " + "success"
          }), '成功']
        }
      }
    },
    {
      label: '处理时间',
      prop: 'settleDate'
    },
    {
      label: '备注',
      prop: 'remark'
    }
  ],


  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false
  }
};
export const INFO_LIST = [
  {
    span: 6,
    style: 'height: 91px;margin-bottom:0px;',
    label: '总金额（元）',
    icon: 'iconjine',
    iconStyle: 'color: #EFA911;',
    tooltip: '',
    key: 'totalSettleAmount',
    value: '0',
    children: []
  },
  {
    span: 6,
    style: 'height: 91px;margin-bottom:0px;',
    label: '结算笔数（笔）',
    icon: 'iconshuliang',
    iconStyle: 'color: #65CC30;',
    tooltip: '',
    key: 'settleCount',
    value: '0',
    children: []
  },
  {
    span: 6,
    style: 'height: 91px;margin-bottom:0px;',
    label: '可结算金额（元）',
    icon: 'iconshenhe',
    iconStyle: 'color: #1989FA;',
    tooltip: '',
    key: 'unSettleAmount',
    value: '0',
    children: []
  },
  {
    span: 6,
    style: 'height: 91px;margin-bottom:0px;margin-right: 0;',
    label: '已结算金额（元）',
    icon: 'iconshenhechenggong',
    iconStyle: 'color: #65CC30;',
    tooltip: '',
    key: 'settledAmount',
    value: '0',
    children: []
  }
]

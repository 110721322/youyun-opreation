import { MerchantList } from "@/libs/config/constant.config";
export const MERCHANT_LIST_CONFIG = {
  gridConfig: [
    {
      label: '商户ID',
      prop: 'merchantNo',
      render: (h, params) => {
        return h(
          'span', { 'class': 'tab-color' }, params.row.merchantNo
        )
      }
    },
    {
      label: '所属服务商',
      prop: 'agentName',
    },
    {
      label: '商户名称',
      prop: 'merchantName',
    },
    {
      label: '手机号',
      prop: 'loginAccount'
    },
    {
      label: '门店数量',
      prop: 'shopCount'
    },
    {
      label: '状态',
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
      },
      {
        name: '商户后台',
        emitName: 'goMerchant',
        type: 'text'
      }
    ]
  }
};

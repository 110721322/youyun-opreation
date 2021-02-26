import { MerchantList } from "@/libs/config/constant.config";
export const SEARCH_FORM_CONFIG = [
  {
    type: 0,
    label: '门店ID',
    key: 'shopNo',
    labelWidth: '128px',
    span: 12
  },
  {
    type: 0,
    label: '门店名称',
    key: 'shopName',
    labelWidth: '128px',
    span: 12
  },
  {
    type: 1,
    label: '审核状态',
    key: 'status',
    labelWidth: '128px',
    options: [
      {
        label: '预审核',
        value: MerchantList.MERCHANT_AUDIT
      },
      {
        label: '平台驳回',
        value: MerchantList.PLATEFORM_REJECT
      },
      {
        label: '通道审核中',
        value: MerchantList.CHANNEL_AUDIT
      },
      {
        label: '通道驳回',
        value: MerchantList.CHANNEL_REJECT
      },
      {
        label: '通道通过',
        value: MerchantList.CHANNEL_PASS
      },
      {
        label: '微信审核中',
        value: MerchantList.WECHAT_AUDIT
      },
      {
        label: '微信未认证',
        value: MerchantList.WECHAT_UNAUTH
      },
      {
        label: '微信认证拒绝',
        value: MerchantList.WECHAT_REJECT
      },
      {
        label: '微信认证成功',
        value: MerchantList.WECHAT_PASS
      }
    ],
    span: 12
  },
  {
    type: 1,
    label: '门店状态',
    key: 'isDisabled',
    labelWidth: '128px',
    options: [
      {
        label: '启用',
        value: MerchantList.MERCHANT_OPEN
      },
      {
        label: '禁用',
        value: MerchantList.MERCHANT_DISABLED
      }
    ],
    span: 12
  },
  {
    type: 0,
    label: '服务电话',
    key: 'phone',
    labelWidth: '128px',
    span: 12
  }
]

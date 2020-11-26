export const FORM_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      defaultDateType: 'third',
      labelWidth: '90px',
      span: 22
    },
    {
      type: 10,
      label: '筛选',
      key: 'search',
      class: 'max-width',
      placeholder: "请输入商户号",
      options: [
        {
          label: '商户名称',
          value: 'merchantName'
        },
        {
          label: '商户ID',
          value: 'merchantNo'
        }
      ],
      labelWidth: '90px',
      span: 22
    },
    {
      type: 0,
      label: '渠道商户号',
      key: 'channelMerchantNo',
      labelWidth: '90px',
      span: 11
    },
    {
      type: 1,
      label: '交易通道',
      key: 'channel',
      labelWidth: '90px',
      span: 11,
      options: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '乐刷',
          value: 'leShua'
        },
        {
          label: '微信',
          value: 'weChat'
        },
        {
          label: '支付宝',
          value: 'alipay'
        }
      ]
    }
  ]
}

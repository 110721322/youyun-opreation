export const FORM_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '100px'
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
      class: 'max-width',
      placeholder: "请输入商户号",
      options: [
        {
          label: '商户ID',
          value: 'merchantNo'
        },
        {
          label: '商户名称',
          value: 'merchantName'
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 0,
      label: '渠道商户号',
      key: 'channelMerchantNo',
      style: 'width:294px',
      placeholder: "请输入渠道商户号"
    },
    {
      type: 1,
      label: '交易通道',
      key: 'channel',
      style: 'width:294px',
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

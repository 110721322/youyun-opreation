export const FORM_CONFIG = {
  talkData: {
    formData: [
      {
        type: 1,
        label: '沟通主题',
        labelWidth: '120px',
        key: 'theme',
        options: [
          {
            label: '你好啊',
            value: 1
          },
          {
            label: '吃饭了么',
            value: 2
          },
          {
            label: '真难吃',
            value: 3
          }
        ]
      },
      {
        type: 0,
        label: '沟通内容',
        inputType: 'textarea',
        maxlength: 200,
        labelWidth: '120px',
        key: 'phone'
      }
    ]
  },
  resetPassword: {
    formData: [
      {
        type: 5,
        label: '密码重置',
        initVal: 1,
        labelWidth: '120px',
        options: [
          {
            label: '登录密码',
            value: 1
          },
          {
            label: '结算密码',
            value: 2
          }
        ]
      }
    ]
  },
  rateSet: {
    formData: [
      {
        type: 0,
        label: '支付宝费率',
        labelWidth: '120px',
        key: 'alipyRate',
        isShowSlot: true,
        showSlotName: '‰',
      },
      {
        type: 0,
        label: '微信费率',
        labelWidth: '120px',
        key: 'wechatRate',
        isShowSlot: true,
        showSlotName: '‰',
      },
      {
        type: 0,
        label: '服务商利润分成',
        labelWidth: '120px',
        key: 'wechatRate',
        isShowSlot: true,
        showSlotName: '％',
      },
    ]
  },
  bankSet: {
    formData: [
      {
        type: 0,
        label: '开户行',
        labelWidth: '120px',
        key: 'bankName'
      },
      {
        type: 0,
        label: '银行卡号',
        labelWidth: '120px',
        key: 'bankNo'
      },
      {
        type: 0,
        label: '开户人姓名',
        labelWidth: '120px',
        key: 'personName'
      },
    ]
  },
  validitySet: {
    formData: [
      {
        type: 11,
        label: '有效期',
        labelWidth: '120px',
        key: 'validityDate'
      }
    ]
  },
  agentStop: {
    formData: [
      {
        type: 1,
        label: '服务商禁用',
        labelWidth: '120px',
        key: 'validityDate',
        initVal: 1,
        options: [
          {
            label: '禁止服务商登录及商户支付服务',
            value: 1
          },{
            label: '禁止服务商结算（可正常登录和商户支付）',
            value: 2
          },
          {
            label: '禁止服务号登录（商户支付正常）',
            value: 3
          }
        ]
      }
    ]
  },
  showSubmit: false,
  showFootBtn: false
}
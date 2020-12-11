import areaData from "@/assets/data/areaData";
export const ADD_AGENT = {
  serviceData: {
    formData: [
      {
        type: 0,
        label: '服务商名称',
        labelWidth: '120px',
        key: 'agentName'
      },
      {
        type: 0,
        label: '登录手机号码',
        inputType: 'textArea',
        maxlength: 11,
        labelWidth: '120px',
        key: 'phone'
      },
      {
        type: 11,
        label: '到期时间',
        labelWidth: '120px',
        key: 'endTime'
      },
      {
        type: 8,
        label: '所在区域',
        key: 'area',
        labelWidth: '120px',
        options: areaData,
      },
      {
        type: 0,
        label: '详细地址',
        labelWidth: '120px',
        key: 'address'
      },
    ],
  },
  rateData: {
    formData: [
      {
        type: 0,
        label: '支付宝费率',
        labelWidth: '120px',
        key: 'alipyRate'
      },
      {
        type: 0,
        label: '微信费率',
        labelWidth: '120px',
        key: 'wechatRate'
      },
      {
        type: 0,
        label: '该服务商利润分成',
        labelWidth: '120px',
        key: 'moneyRate'
      }
    ]
  },
  settleData: {
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
        key: 'bankCard'
      },
      {
        type: 11,
        label: '开户人姓名',
        labelWidth: '120px',
        key: 'bankName'
      }
    ]
  },
  showSubmit: false,
  showFootBtn: false
}
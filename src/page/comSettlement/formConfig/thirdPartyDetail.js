import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  detailData: {
    title: '设备',
    showFootBtn: true,
    key: 'date',
    formData: [
      {
        type: 6,
        label: '发票照片',
        key: 'expressImg',
        initVal: '',
        maxNum: 1,
        rules: setRules('发票照片').isSelected.get
      },
      {
        type: 0,
        label: '发票快递单号',
        key: 'expressNumber',
        initVal: '',
        rules: setRules('有底单号').isRequired.get
      },
      {
        type: "show",
        label: '结算账户',
        key: 'settleAccount',
        initVal: '',
        rules: setRules('结算账户').isRequired.get,
        isDisabled: true
      },
      {
        type: "show",
        label: '联系电话',
        key: 'settleMobile',
        initVal: '',
        rules: setRules('联系电话').isRequired.get,
        isDisabled: true
      },
      {
        type: 0,
        label: '备用联系方式',
        key: 'alternatePhone',
        initVal: ''
      },
      {
        type: 0,
        label: '备注',
        key: 'settleRemark',
        initVal: '',
        inputType: 'textarea'
      }
    ]
  }
}

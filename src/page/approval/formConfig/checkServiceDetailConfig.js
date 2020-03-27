// import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  rejectReason: {
    title: '驳回',
    showFootBtn: true,
    formData: [
      {
        type: 2,
        label: '基本信息',
        key: 'baseData',
        initVal: ['合伙人姓名与证件不符'],
        options: [
          {
            label: '合伙人姓名与证件不符',
            value: 0
          },
          {
            label: '合伙人身份证正面照有误',
            value: 1
          },
          {
            label: '合伙人身份证反面照有误',
            value: 2
          },
          {
            label: '合伙人手持身份证有误',
            value: 3
          }
        ]
      },
      {
        type: 0,
        label: '其他原因',
        key: 'reason',
        initVal: 'pdd',
        inputType: 'textarea'
      }
    ]
  }
}

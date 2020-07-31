// import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  rejectReason: {
    title: '驳回',
    showFootBtn: true,
    formData: [
      {
        type: 5,
        label: '驳回原因',
        key: 'baseData',
        options: [
          {
            label: '合伙人姓名与证件不符',
            value: 1
          },
          {
            label: '合伙人身份证正面照有误',
            value: 2
          },
          {
            label: '合伙人身份证反面照有误',
            value: 3
          },
          {
            label: '合伙人手持身份证有误',
            value: 4
          }
        ]
      },
      {
        type: 0,
        label: '其他原因',
        key: 'reason',
        inputType: 'textarea'
      }
    ]
  }
}

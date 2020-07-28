// import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  rejectReason: {
    title: '驳回原因',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '驳回原因',
        key: 'reason',
        inputType: 'textarea'
      }
    ]
  }
}

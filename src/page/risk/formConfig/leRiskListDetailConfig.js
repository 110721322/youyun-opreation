import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  rejectData: {
    title: '驳回原因',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '驳回原因',
        key: 'reason',
        initVal: 'pdd',
        inputType: 'textarea',
        rules: setRules('驳回原因').isRequired.get
      }
    ]
  }
}

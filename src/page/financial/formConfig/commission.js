import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  rejectData: {
    title: '驳回',
    showFootBtn: true,
    footBtnLabel: "确定",
    formData: [
      {
        type: 0,
        label: '驳回原因',
        key: 'reason',
        initVal: '',
        inputType: 'textarea',
        rules: setRules('驳回原因').isRequired.get
      }
    ]
  }
}

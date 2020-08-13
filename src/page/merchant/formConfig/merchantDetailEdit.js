import { setRules } from '@/libs/kit/formFns.js'

export const CONTACTS_CONFIG = {
  title: '添加备注',
  showFootBtn: true,
  footBtnLabel: "确定",
  formData: [
    {
      type: 0,
      label: '备注',
      key: 'remark',
      inputType: 'textarea',
      maxlength: '150',
      rules: setRules('请输入').isRequired.get
    }
  ]
}

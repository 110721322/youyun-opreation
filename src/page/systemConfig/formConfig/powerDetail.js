import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  buyData: {
    title: '添加子页面',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '页面名称',
        key: 'name7',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '页面链接',
        key: 'name8',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      }
    ]
  }
}

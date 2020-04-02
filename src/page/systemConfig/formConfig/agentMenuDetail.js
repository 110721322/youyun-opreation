import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  deviceData: {
    title: '菜单',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '菜单名称',
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
      },
      {
        type: 0,
        label: '页面Id',
        key: 'name9',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      }
    ]
  }
}

// import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  formData: {
    title: '广告权限',
    showFootBtn: true,
    formData: [
      {
        type: 2,
        label: '广告权限',
        key: 'baseData',
        initVal: [1],
        options: [
          {
            label: '蜻蜓-开机广告',
            value: 1
          },
          {
            label: '青蛙-开机广告',
            value: 2
          }
        ]
      }
    ]
  }
}

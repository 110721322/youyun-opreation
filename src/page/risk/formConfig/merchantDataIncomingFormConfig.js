import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  riskMessage: {
    title: '新增风控信息',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '信息类型',
        key: 'banField',
        initVal: '0',
        options: [
          {
            label: '农村',
            value: '0'
          },
          {
            label: '城市',
            value: '1'
          }
        ],
        rules: setRules('信息类型').isRequired.get
      },
      {
        type: 0,
        label: '内容',
        key: 'content',
        initVal: 'pdd',
        rules: setRules('内容').isRequired.get
      },
      {
        type: 1,
        label: '类型',
        key: 'type',
        initVal: '0',
        options: [
          {
            label: '农村',
            value: '0'
          },
          {
            label: '城市',
            value: '1'
          }
        ],
        rules: setRules('类型').isRequired.get
      }
    ]
  }
}

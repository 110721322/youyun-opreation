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
        initVal: ['公司全称与营业执照不一致'],
        options: [
          {
            label: '公司全称与营业执照不一致',
            value: 0
          },
          {
            label: '营业执照不清晰',
            value: 1
          },
          {
            label: '法人姓名有误',
            value: 2
          },
          {
            label: '法人身份证正面不清晰',
            value: 3
          },
          {
            label: '法人身份证反面不清晰',
            value: 4
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

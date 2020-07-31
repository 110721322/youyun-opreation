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
        options: [
          {
            label: '营业执照编号',
            value: 'shopLicenseNo'
          },
          {
            label: '法人身份证号',
            value: 'lawIdCard'
          },
          {
            label: '法人手机号',
            value: 'lawMobile'
          },
          {
            label: '银行卡号',
            value: 'bankCardNo'
          }
        ],
        rules: setRules('信息类型').isSelected.get
      },
      {
        type: 0,
        label: '内容',
        key: 'content',
        rules: setRules('内容').isRequired.get
      },
      {
        type: 1,
        label: '类型',
        key: 'type',
        options: [
          {
            label: '灰名单',
            value: 'gray'
          },
          {
            label: '黑名单',
            value: 'black'
          }
        ],
        rules: setRules('类型').isRequired.get
      }
    ]
  }
}

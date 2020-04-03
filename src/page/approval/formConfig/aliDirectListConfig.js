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
        inputType: 'textarea'
      }
    ]
  },
  passData: {
    title: '补充信息',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: 'APPID',
        key: 'appid',
        initVal: 'pdd'
      },
      {
        type: 0,
        label: 'PID',
        key: 'pid',
        initVal: 'pdd'
      }
    ]
  },
  detailEdit: {
    title: '补充信息',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '邮箱',
        key: 'email',
        initVal: ''
      },
      {
        type: 0,
        label: 'APPID',
        key: 'appid',
        initVal: 'pdd',
        rules: setRules('APPID').isRequired.get
      },
      {
        type: 0,
        label: 'PID',
        key: 'pid',
        initVal: 'pdd',
        rules: setRules('PID').isRequired.get
      }
    ]
  }
}
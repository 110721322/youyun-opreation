import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  formData: {
    title: '入库信息',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '设备型号',
        key: 'deviceModel',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 3,
        label: '保修截止日期',
        key: 'deadline',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 3,
        label: '入库时间',
        key: 'inputTime',
        initVal: 'pdd',
        rules: setRules('公司名称').isRequired.get
      },
      {
        type: 0,
        label: '设备标识',
        key: 'deviceIdentifier',
        initVal: 'pdd',
        rules: setRules('公司名称').isRequired.get
      }
    ]
  }
}

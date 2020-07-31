import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  detailData: {
    title: '设备',
    showFootBtn: true,
    formData: [
      {
        type: "uploadFile",
        label: '发票照片',
        key: 'photo',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '发票快递单号',
        key: 'linkmanName',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '结算账户',
        key: 'linkmanPhone',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '联系电话',
        key: 'deviceNumLimit',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '备用联系方式',
        key: 'asyncNotifyUrl',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '备注',
        key: 'remark',
        initVal: 'pdd',
        inputType: 'textarea'
      }
    ]
  }
}

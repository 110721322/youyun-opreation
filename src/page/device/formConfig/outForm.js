import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  sendData: {
    title: '设备发货',
    showFootBtn: true,
    formData: [
      {
        type: 3,
        label: '选择出库时间',
        key: 'name7',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '快递单号',
        key: 'name7',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '备注',
        key: 'name7',
        initVal: 'pdd',
        inputType: 'textarea',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 'uploadFile',
        label: '设备标识',
        key: 'name6',
        initVal: 'pdd',
        rules: setRules('公司名称').isRequired.get
      }
    ]
  },
  distributionData: {
    title: '分配出库人员',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '出库人员',
        key: 'food1',
        initVal: [],
        // urlOptions: {
        //     url: './demo.js',
        //     keyName: 'records',
        //     method: 'get'
        // }
        options: [
          {
            label: '川菜',
            value: 0
          },
          {
            label: '粤菜',
            value: 1
          },
          {
            label: '杭帮菜',
            value: 2
          }
        ]
      }
    ]
  }
}

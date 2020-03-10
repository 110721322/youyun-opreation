import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  deviceData: {
    title: '新增入库',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '设备型号',
        key: 'food',
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
      },
      {
        type: 3,
        label: '保修截止日期',
        key: 'name7',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 3,
        label: '入库时间',
        key: 'name6',
        initVal: 'pdd',
        rules: setRules('公司名称').isRequired.get
      },
      {
        type: 'uploadFile',
        label: '设备标识',
        key: 'name6',
        initVal: 'pdd',
        rules: setRules('公司名称').isRequired.get
      }
    ]
  }
}

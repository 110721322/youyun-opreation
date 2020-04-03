import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  detailData: {
    title: '设备',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '对接商名称',
        key: 'name71',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '对接人',
        key: 'name72',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '对接人手机号',
        key: 'name73',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '设备数量限制',
        key: 'name74',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '异步通知地址',
        key: 'name17',
        initVal: 'pdd'
      },
      {
        type: 0,
        label: '同步通知地址',
        key: 'name75',
        initVal: 'pdd'
      },
      {
        type: 0,
        label: '同步失败地址',
        key: 'name77',
        initVal: 'pdd'
      },
      {
        type: 5,
        label: '网络状态',
        key: 'adressType',
        initVal: 0,
        options: [
          {
            label: '外网对接',
            value: 0
          },
          {
            label: '局域网对接',
            value: 1
          }
        ],
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '备注',
        key: 'name112',
        initVal: 'pdd',
        inputType: 'textarea'
      },
      {
        type: 1,
        label: '所属服务商',
        key: 'food',
        initVal: "",
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
import { setRules } from '@/libs/kit/formFns.js'

export const ADVERTISING_MATERIAL_CONFIG = {
  deviceData: {
    title: '修改地址',
    showFootBtn: true,
    formData: [
      {
        type: 'input',
        label: '收件人',
        key: 'advertType',
        rules: setRules('收件人').isRequired.get,
        labelWidth: '100px'
      },
      {
        type: 'input',
        label: '联系电话',
        key: 'advertImg',
        labelWidth: '100px',
        rules: setRules('联系电话').isRequired.get
      },
      {
        type: 'select',
        label: '邮寄地区',
        key: 'advertName',
        initVal: 'pdd',
        rules: setRules('邮寄地区').isRequired.get,
        options: [
          {
            value: '张三',
            id: '1'
          },
          {
            value: '李四',
            id: '2'
          }
        ]
      },
      {
        type: 'input',
        label: '详细地址',
        key: 'advertUrl',
        initVal: 'pdd',
        rules: setRules('详细地址').isRequired.get
      },
      {
        type: 'iSwitch',
        label: '设置默认地址',
        key: 'advertUrl'
      }
    ]
  },
  // 表单基础数据类型，需要预先赋值
  formModel: {
    id: '',
    tel: '',
    name: '',
    email: '',
    status: '',
    create_time: '',
    expand: '',
    roleIdList: []
  }
};

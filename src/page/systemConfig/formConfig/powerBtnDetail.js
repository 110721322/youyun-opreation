import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  buyData: {
    title: '添加子页面',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '按钮名称',
        key: 'name7',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '按钮链接',
        key: 'name8',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 5,
        label: '按钮链接',
        key: 'name9',
        initVal: 'pdd',
        options: [{
          label: '不显示',
          value: 1
        }, {
          label: '点击文字提示',
          value: 2
        }],
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 5,
        label: '审批操作',
        key: 'name10',
        initVal: 'pdd',
        options: [{
          label: '是',
          value: 1
        }, {
          label: '否',
          value: 2
        }],
        rules: setRules('邮箱').isRequired.get
      }
    ]
  }
}

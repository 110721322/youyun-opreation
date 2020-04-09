import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  addData: {
    title: '',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '广告名称',
        key: 'advertName',
        initVal: 'pdd',
        style: 'width:364px',
        rules: setRules('广告名称').isRequired.get
      },
      {
        type: 1,
        label: '广告类型',
        key: 'advertType',
        initVal: [],
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
        type: 6,
        label: '广告图片',
        key: 'advertImg',
        initVal: 'pdd',
        rules: setRules('广告图片').isRequired.get
      }
    ]
  },
  editData: {
    title: '',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '广告名称',
        key: 'advertName',
        initVal: 'pdd',
        style: 'width:364px',
        rules: setRules('广告名称').isRequired.get
      },
      {
        type: "show",
        label: '广告类型',
        key: 'advertType',
        initVal: [],
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
        type: 6,
        label: '广告图片',
        key: 'advertImg',
        initVal: 'pdd',
        rules: setRules('广告图片').isRequired.get
      }
    ]
  }
}

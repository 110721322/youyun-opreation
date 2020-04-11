import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  editData: {
    title: '编辑大区',
    showFootBtn: true,
    footBtnLabel: "保存",
    formData: [
      {
        type: 0,
        label: '大区名称',
        key: 'regionName',
        initVal: '',
        rules: setRules('大区名称').isRequired.get
      }
    ]
  },
  addData: {
    title: '添加大区',
    showFootBtn: true,
    footBtnLabel: "保存",
    formData: [
      {
        type: 0,
        label: '大区名称',
        key: 'regionName',
        initVal: '',
        rules: setRules('大区名称').isRequired.get
      }
    ]
  }
}

import { setRules } from '@/libs/kit/formFns.js'

export const LISASION = {
  title: '添加沟通计划',
  showFootBtn: true,
  footBtnLabel: "确定",
  formData: [
    {
      type: 0,
      label: '联系人',
      key: 'linkmanName',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 0,
      label: '手机号',
      key: 'phoneNum',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 0,
      label: '职位',
      key: 'jobName'
    },
    {
      type: 0,
      label: '备注',
      key: 'remark'
    }
  ]
}

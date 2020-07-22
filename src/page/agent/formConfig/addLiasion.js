import { setRules } from '@/libs/kit/formFns.js'

export const LISASION = {
  addData: {
    title: '新增联系人',
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
        type: 1,
        label: '在职状态',
        key: 'jobStatus',
        options: [
          {
            label: '在职',
            value: 'on'
          },
          {
            label: '离职',
            value: 'off'
          }
        ],
        rules: setRules('请选择').isRequired.get
      },
      {
        type: 0,
        label: '职位',
        key: 'jobName',
        rules: setRules('请输入').isRequired.get
      },
      {
        type: 0,
        label: '备注',
        key: 'remark'
      }
    ]
  },
  editData: {
    title: '编辑联系人',
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
        type: 1,
        label: '在职状态',
        key: 'jobStatus',
        options: [
          {
            label: '在职',
            value: 'on'
          },
          {
            label: '离职',
            value: 'off'
          }
        ],
        rules: setRules('请选择').isRequired.get
      },
      {
        type: 0,
        label: '职位',
        key: 'jobName',
        rules: setRules('请输入').isRequired.get
      },
      {
        type: 0,
        label: '备注',
        key: 'remark'
      }
    ]
  }
}

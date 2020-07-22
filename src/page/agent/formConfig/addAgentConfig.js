import { setRules } from '@/libs/kit/formFns.js';
import areaData from "@/assets/data/areaData";

export const FORM_CONFIG = {
  formData: [
    {
      type: 5,
      label: '商户类型',
      key: 'businessType',
      options: [
        {
          label: '企业',
          value: 'enterprise '
        },
        {
          label: '个人',
          value: 'individual'
        }
      ],
      rules: setRules('请选择').isRequired.get
    },
    {
      type: 0,
      label: '公司名称',
      key: 'agentName',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 0,
      label: '法人姓名',
      key: 'personName',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 0,
      label: '法人电话',
      key: 'personMobile',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 8,
      label: '公司地址',
      key: 'companyAddress',
      rules: setRules('请输入').isSelected.get,
      options: areaData
    },
    {
      type: 0,
      label: '详细地址',
      key: 'address',
      placeholder: '请输入详细地址',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 0,
      label: '邮箱',
      key: 'email'
    },
    {
      type: 0,
      label: '后台账号',
      key: 'account',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 0,
      label: '所属运营人员',
      key: 'operationId'
    },
    {
      type: 5,
      label: '服务类型',
      key: 'activeMode',
      options: [
        {
          label: '小马哥代理',
          value: 'xiaomage'
        },
        {
          label: 'OEM代理',
          value: 'oem'
        }
      ]
    }
  ]
}

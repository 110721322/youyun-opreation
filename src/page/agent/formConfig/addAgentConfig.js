import { setRules } from '@/libs/kit/formFns.js';
import areaData from "@/assets/data/areaData";

export const FORM_CONFIG = {
  formData: [
    {
      type: 5,
      label: '商户类型',
      key: 'businessType',
      initVal: "individual",
      options: [
        {
          label: '企业',
          value: 'enterprise'
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
      placeholder: '请输入公司全称',
      rules: setRules('公司全称').isRequired.get
    },
    {
      type: 0,
      label: '法人姓名',
      key: 'personName',
      rules: setRules('法人姓名').isRequired.get
    },
    {
      type: 0,
      label: '法人电话',
      key: 'personMobile',
      rules: setRules('法人电话').isRequired.get
    },
    {
      type: 8,
      label: '公司地址',
      key: 'companyAddress',
      rules: setRules('公司地址').isSelected.get,
      options: areaData
    },
    {
      type: 0,
      label: '详细地址',
      key: 'address',
      placeholder: '请输入详细地址',
      rules: setRules('详细地址').isRequired.get
    },
    {
      type: 0,
      label: '邮箱',
      key: 'email',
      rules: setRules('邮箱').isRequired.get
    },
    {
      type: 0,
      label: '后台账号',
      key: 'account',
      placeholder: '请输入登录后台的手机号',
      tip: '注：密码会已短信形式发送到该手机号中',
      rules: setRules('后台账号').isRequired.get
    },
    {
      type: 5,
      label: '服务类型',
      key: 'activeMode',
      initVal: 'xiaomage',
      options: [
        {
          label: '小马哥代理',
          value: 'xiaomage'
        }
      ]
    }
  ]
}

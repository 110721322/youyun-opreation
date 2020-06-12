import { setRules } from '@/libs/kit/formFns.js';

export const FORM_CONFIG = {
  formData: [
    {
      type: 5,
      label: '商户类型',
      key: 'deviceType',
      options: [
        {
          label: '企业',
          value: 0
        },
        {
          label: '个人',
          value: 1
        }
      ]
    },
    {
      type: 0,
      label: '公司名称',
      key: 'companyName',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 0,
      label: '法人姓名',
      key: 'legalName',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 0,
      label: '法人电话',
      key: 'legalPhone',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 8,
      label: '公司地址',
      key: 'companyAddress',
      rules: setRules('请输入').isRequired.get,
      options: [
        {
          label: '省',
          value: '1',
          children: [
            {
              label: '市',
              value: '2',
              children: [
                {
                  label: '区',
                  value: '3'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: 0,
      label: '详细地址',
      key: 'address',
      placeholder: '请输入详细地址'
    },
    {
      type: 0,
      label: '邮箱',
      key: 'email',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 0,
      label: '后台账号',
      key: 'mobile',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 1,
      label: '所属运营',
      key: 'father',
      options: [
        {
          label: '企业',
          value: 0
        },
        {
          label: '个人',
          value: 1
        }
      ]
    },
    {
      type: 5,
      label: '服务类型',
      key: 'serveWay',
      options: [
        {
          label: '小马哥代理',
          value: 0
        },
        {
          label: 'OEM代理',
          value: 1
        }
      ]
    }
  ]
}

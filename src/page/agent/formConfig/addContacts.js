import { setRules } from '@/libs/kit/formFns.js'
import aipAgent from '@/api/api_agent.js'

export const CONTACTS_CONFIG = {
  title: '添加沟通计划',
  showFootBtn: true,
  footBtnLabel: "确定",
  formData: [
    {
      type: 1,
      label: '联系人',
      key: 'addressBookId',
      urlOptions: {
        url: aipAgent.addressBookQuery,
        keyName: 'id',
        valueName: 'linkmanName',
        method: 'get',
        params: {
          relateCode: localStorage.getItem('liasionAgent')
        }
      },
      rules: setRules('请输入').isSelected.get
    },
    {
      type: 0,
      label: '备注',
      key: 'remark',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 14,
      label: '下次联系时间',
      key: 'nextContactTime',
      class: 'max-width',
      labelWidth: '100px',
      rules: setRules('请输入').isSelected.get
    },
    {
      type: 1,
      label: '提醒时间',
      key: 'remindType',
      options: [
        {
          label: '十分钟前',
          value: 'before10M'
        },
        {
          label: '半个小时前',
          value: 'before30M'
        },
        {
          label: '一个小时前',
          value: 'before1H'
        },
        {
          label: '两个小时前',
          value: 'before2H'
        },
        {
          label: '三个小时前',
          value: 'before3H'
        },
        {
          label: '一天前',
          value: 'before1D'
        }
      ],
      rules: setRules('请输入').isSelected.get
    }
  ],
  formData1: [
    {
      type: 1,
      label: '联系人',
      key: 'addressBookId',
      urlOptions: {
        url: aipAgent.addressBookQuery,
        keyName: 'id',
        valueName: 'linkmanName',
        method: 'get',
        params: {
          relateCode: localStorage.getItem('liasionAgent')
        }
      },
      rules: setRules('请选择').isSelected.get
    },
    {
      type: 1,
      label: '沟通方式',
      key: 'way',
      options: [
        {
          label: '电话呼出',
          value: 'phoneOut'
        },
        {
          label: '电话呼入',
          value: 'phoneIn'
        },
        {
          label: '微信',
          value: 'wechat'
        },
        {
          label: '面谈',
          value: 'interview'
        },
        {
          label: '邮件',
          value: 'mail'
        }
      ],
      rules: setRules('请输入').isSelected.get
    },
    {
      type: 8,
      label: '沟通主题',
      key: 'theme',
      options: [
        {
          label: '日常沟通选项',
          value: 'dailyTalk',
          children: [
            {
              label: '问题处理',
              value: 'question'
            },
            {
              label: '客情维护',
              value: 'guest'
            },
            {
              label: '通知',
              value: 'train'
            },
            {
              label: '培训',
              value: 'notify'
            }
          ]
        },
        {
          label: '日常任务选项',
          value: 'dailyTask',
          children: [
            {
              label: '结算失败',
              value: 'settleFail'
            },
            {
              label: '短信充值',
              value: 'msgRecharge'
            },
            {
              label: '客单价异常',
              value: 'priceException'
            },
            {
              label: '交易数据异常',
              value: 'tradeException'
            }
          ]
        },
        {
          label: '新单沟通选项',
          value: 'newTalk',
          children: [
            {
              label: '开户',
              value: 'open'
            },
            {
              label: '了解客户信息',
              value: 'customerInfo'
            },
            {
              label: '新单教学',
              value: 'teaching'
            }
          ]
        }
      ],
      rules: setRules('请输入').isSelected.get
    },
    {
      type: 0,
      label: '沟通内容',
      key: 'content',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 14,
      label: '下次联系时间',
      key: 'remindTime',
      class: 'max-width',
      labelWidth: '100px'
    }
  ]
}

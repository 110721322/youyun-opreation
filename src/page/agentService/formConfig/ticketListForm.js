import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  replyData: {
    title: '工单回复',
    showFootBtn: true,
    footBtnLabel: "提交",
    formData: [
      {
        type: 0,
        label: '解决方案',
        key: 'checkSolution',
        initVal: '',
        inputType: 'textarea',
        rules: setRules('解决方案').isRequired.get
      }
    ]
  },
  distributionData: {
    title: '分配处理人员',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '处理人员',
        key: 'operatorId',
        initVal: "0",
        options: [
          {
            label: '川菜',
            value: '0'
          },
          {
            label: '粤菜',
            value: '1'
          },
          {
            label: '杭帮菜',
            value: '2'
          }
        ],
        rules: setRules('广告名称').isRequired.get
      }
    ]
  },
  checkReplyData: {
    title: '查看工单回复',
    showFootBtn: true,
    formData: [
      {
        type: 'show',
        label: '解决方案',
        key: 'solution',
        initVal: "佣金为0，请佣金达到500后进行结算"
      }
    ]
  }
}

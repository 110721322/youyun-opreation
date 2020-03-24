import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  params: {
    title: '参数设置',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '钉钉通讯地址',
        key: 'dingdingAddress',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      }
    ]
  },
  customerPrice: {
    title: '参数设置',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '客单价≥',
        key: 'perCustomerTransaction',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get,
        hideColon: true,
        isShowSlot: true,
        showSlotName: '元'
      },
      {
        type: 0,
        label: '交易笔数≥',
        key: 'transactionNum',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get,
        hideColon: true,
        isShowSlot: true,
        showSlotName: '元'
      }
    ]
  },
  payData: {
    title: '参数设置',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '比较类型',
        key: 'dataComparisonType',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 0,
        label: '交易笔数≥',
        key: 'dataTransactionNum',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get,
        hideColon: true,
        isShowSlot: true,
        showSlotName: '元'
      },
      {
        type: 0,
        label: '比例≥',
        key: 'dataRatio',
        initVal: 'pdd',
        rules: setRules('邮箱').isRequired.get,
        hideColon: true,
        isShowSlot: true,
        showSlotName: '元'
      }
    ]
  }
}

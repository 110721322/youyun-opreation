import { setRules } from '@/libs/kit/formFns.js'
import apiAgent from "@/api/api_agent.js";

export const FORM_CONFIG = {
  sendData: {
    title: '发货信息',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '快递单号',
        key: 'expressNumberOut',
        initVal: '',
        rules: setRules('邮箱').isRequired.get
      }
    ]
  },
  doneData: {
    title: '维修信息',
    showFootBtn: true,
    footBtnLabel: "确定",
    formData: [
      {
        type: 0,
        label: '维修费用',
        key: 'amount',
        rules: setRules('邮箱').isRequired.get
      }
    ]
  },
  distributionData: {
    title: '分配发货人员',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '发货人员',
        key: 'distributionUserId',
        urlOptions: {
          url: apiAgent.queryAllOperation,
          keyName: 'operationId',
          valueName: 'operationName',
          method: 'get'
        }
      }
    ]
  },
  rejectData: {
    title: '驳回',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '驳回原因',
        key: 'rejectRemark',
        inputType: 'textarea',
        rules: setRules('邮箱').isRequired.get
      }
    ]
  }
}

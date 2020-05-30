import { setRules } from '@/libs/kit/formFns.js'
import apiAgent from "@/api/api_agent.js";

export const FORM_CONFIG = {
  sendData: {
    title: '设备发货',
    showFootBtn: true,
    formData: [
      {
        type: 11,
        label: '选择出库时间',
        key: 'outputTime',
        format: 'yyyy-MM-dd hh:mm:ss',
        datatype: "datetime"
      },
      {
        type: 0,
        label: '快递单号',
        key: 'expressNo',
        rules: setRules('快递单号').isRequired.get
      },
      {
        type: 0,
        label: '备注',
        key: 'outputRemark',
        inputType: 'textarea',
        rules: setRules('备注').isRequired.get
      },
      {
        type: 'uploadFile',
        label: '设备标识',
        key: 'deviceIdentifierList',
        rules: setRules('设备标识').isRequired.get
      }
    ]
  },
  checkData: {
    title: '订单信息',
    showFootBtn: true,
    footBtnLabel: "确定",
    formData: [
      {
        type: 'show',
        label: '销售人员',
        key: 'saleUserName'
      },
      {
        type: 'show',
        label: '订单号',
        key: 'outputNo'
      },
      {
        type: 'show',
        label: '订单类型',
        key: 'outputType'
      },
      {
        type: 'show',
        label: '订单金额',
        key: 'amount'
      },
      {
        type: 'show',
        label: '实付金额',
        key: 'actualAmount'
      },
      {
        type: 'show',
        label: '购买服务商',
        key: 'agentName'
      },
      {
        type: 'show',
        label: '支付方式',
        key: 'payType'
      },
      {
        type: 'show',
        label: '打款凭证',
        key: 'voucher',
        isImage: true
      },
      {
        type: 'show',
        label: '运营备注',
        key: 'financeRemark'
      },
      {
        type: 'show',
        label: '驳回原因',
        key: 'rejectRemark'
      }
    ]
  },
  distributionData: {
    title: '分配出库人员',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '出库人员',
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

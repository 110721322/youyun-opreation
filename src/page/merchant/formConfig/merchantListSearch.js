import areaData from "@/assets/data/areaData";
import apiAgent from "@/api/api_agent.js";

export const FORM_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      querySelectAll: true,
      key: 'date',
      labelWidth: '110px',
      datatype: 'datetimerange',
      span: 22,
      isSelectToday: true
    },
    {
      type: 10,
      label: '精准筛选',
      key: 'search',
      options: [
        {
          label: '商户ID',
          value: 'merchantNo'
        },
        {
          label: '商户名称',
          value: 'merchantName'
        },
        {
          label: '所属服务商名称',
          value: 'agentName'
        },
        {
          label: '乐刷商户号',
          value: 'leShuaMerchantNo'
        }
        // {
        //   label: '新大陆商户号',
        //   value: 'newlandMerchantNo'
        // }
      ],
      labelWidth: '110px',
      span: 22
    },
    {
      type: 1,
      label: '使用通道',
      key: 'channelCode',
      labelWidth: '110px',
      span: 11,
      options: [
        {
          label: '乐刷',
          value: "leShua"
        }
        // {
        //   label: '支付宝直连',
        //   value: "alipay"
        // },
        // {
        //   label: '微信直连',
        //   value: "weChat"
        // }
      ]
    },
    {
      type: 8,
      label: '地区',
      key: 'address',
      labelWidth: '110px',
      span: 11,
      options: areaData
    },
    {
      type: 1,
      label: '开通通道详情',
      key: 'channelStatus',
      labelWidth: '110px',
      span: 11,
      options: [
        {
          label: '待审核',
          value: 'nonOpen'
        },
        {
          label: '平台审核中',
          value: 'platformAudit'
        },
        {
          label: '通道审核中',
          value: 'channelAudit'
        },
        {
          label: '平台驳回',
          value: 'platformReject'
        },
        {
          label: '通道驳回',
          value: 'channelReject'
        },
        {
          label: '通过',
          value: 'channelPass'
        }
      ]
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operationId',
      labelWidth: '110px',
      span: 11,
      urlOptions: {
        url: apiAgent.queryAllOperation,
        keyName: 'operationId',
        valueName: 'operationName',
        method: 'get'
      }
    }
  ]
}

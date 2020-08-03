import apiAgent from "@/api/api_agent.js";
import api from "@/api/api_risk"
export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '100px'
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
      class: 'max-width',
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
          label: '乐刷商户号',
          value: 'channelMerchantNo'
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '状态',
      key: 'status',
      style: 'width:294px',
      options: [
        {
          label: '通过',
          value: 'pass'
        },
        {
          label: '驳回',
          value: 'reject'
        },
        {
          label: '等待通道审核',
          value: 'waitChannelAudit'
        },
        {
          label: '通道审核中',
          value: 'channelAudit'
        },
        {
          label: '通道通过',
          value: 'channelPass'
        },
        {
          label: '通道驳回',
          value: 'channelReject'
        },
        {
          label: '通道审核中',
          value: 'channelAudit'
        },
        {
          label: '待开通',
          value: 'nonOpen'
        },
        {
          label: '平台审核中',
          value: 'platformAudit'
        },
        {
          label: '平台驳回',
          value: 'platformReject'
        },
        {
          label: '等待通道审核',
          value: 'waitChannelAudit'
        },
        {
          label: '等待预审核',
          value: 'waitPreAudit'
        }
      ]
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operateUserNo',
      labelWidth: '185px',
      urlOptions: {
        url: apiAgent.queryAllOperation,
        keyName: 'operationId',
        valueName: 'operationName',
        method: 'get'
      }
    },
    {
      type: 1,
      label: '状态',
      key: 'status',
      style: 'width:294px',
      urlOptions: {
        url: api.leshuaGetStatus,
        method: 'get'
      }
    }
  ]
}

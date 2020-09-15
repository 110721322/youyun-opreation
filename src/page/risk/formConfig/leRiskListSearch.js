import apiAgent from "@/api/api_agent.js";
export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '80px',
      span: 20
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
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
      labelWidth: '80px',
      span: 11
    },
    {
      type: 1,
      label: '状态',
      key: 'status',
      labelWidth: '80px',
      span: 11,
      options: [
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
          label: '待开通',
          value: 'nonOpen'
        },
        {
          label: '预审核驳回',
          value: 'preAuditReject'
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
      labelWidth: '80px',
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

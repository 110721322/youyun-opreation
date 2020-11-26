import apiAgent from "@/api/api_agent.js";
export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      defaultDateType: 'all',
      class: 'max-width',
      labelWidth: '110px',
      span: 22
    },
    {
      type: 10,
      label: '筛选',
      key: 'search',
      options: [
        {
          label: '商户名称',
          value: 'merchantName'
        },
        {
          label: '商户ID',
          value: 'merchantNo'
        },
        {
          label: '乐刷商户号',
          value: 'channelMerchantNo'
        }
      ],
      labelWidth: '110px',
      span: 22
    },
    {
      type: 1,
      label: '状态',
      key: 'status',
      labelWidth: '110px',
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
      labelWidth: '110px',
      span: 11,
      urlOptions: {
        url: apiAgent.queryAllOperation,
        keyName: 'operationId',
        valueName: 'operationName',
        method: 'get'
      }
    },
    {
      type: 0,
      label: '乐刷商户号',
      key: 'channelMerchantNo',
      labelWidth: '110px',
      span: 11
    }
  ]
}

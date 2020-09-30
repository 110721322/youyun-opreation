// import areaData from "@/assets/data/areaData"
import apiAgent from "@/api/api_agent.js";

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      format: "yyyy-MM-dd",
      labelWidth: '80px',
      span: 22
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
        }
      ],
      labelWidth: '80px',
      span: 22
    },
    {
      type: 1,
      label: '通道状态',
      key: 'status',
      labelWidth: '80px',
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
          label: '审核通过',
          value: 'channelPass'
        }
      ]
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operationId',
      labelWidth: '80px',
      span: 11,
      urlOptions: {
        url: apiAgent.queryAllOperation,
        keyName: 'operationId',
        valueName: 'operationName',
        method: 'get'
      }
    }]
}

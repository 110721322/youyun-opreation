import apiAgent from "@/api/api_agent.js";

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      selectSevenDay: true,
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
      label: '状态',
      key: 'status',
      options: [
        {
          label: '已通过',
          value: 'channelPass'
        },
        {
          label: '已驳回',
          value: 'channelReject'
        },
        {
          label: '预审核',
          value: 'waitPreAudit'
        }
      ],
      labelWidth: '80px',
      span: 11
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
    }]
}

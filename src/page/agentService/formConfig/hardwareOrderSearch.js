import apiAgent from "@/api/api_agent.js";

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
          label: '订单号',
          value: 'outputNo'
        },
        {
          label: '购买服务商',
          value: 'agentNo'
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '订单类型',
      key: 'outputType',
      style: 'width:294px',
      options: [
        {
          label: '商城购买',
          value: 1
        },
        {
          label: '运营订购',
          value: 2
        }
      ]
    },
    {
      type: 1,
      label: '订单状态',
      key: 'status',
      style: 'width:294px',
      labelWidth: '185px',
      urlOptions: {
        url: apiAgent.orderStatus,
        keyName: 'status',
        valueName: 'statusDesc',
        method: 'get'
      }
    }]
}

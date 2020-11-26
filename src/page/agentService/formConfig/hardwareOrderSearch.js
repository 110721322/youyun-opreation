import apiAgent from "@/api/api_agent.js";

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      defaultDateType: "first",
      format: "yyyy-MM-dd HH:mm:ss",
      datatype: "datetimerange",
      class: 'max-width',
      labelWidth: '80px',
      span: 22
    },
    {
      type: 10,
      label: '筛选',
      key: 'search',
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
      labelWidth: '80px',
      span: 22
    },
    {
      type: 1,
      label: '订单类型',
      key: 'outputType',
      labelWidth: '80px',
      span: 11,
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
      labelWidth: '80px',
      span: 11,
      urlOptions: {
        url: apiAgent.orderStatus,
        keyName: 'status',
        valueName: 'statusDesc',
        method: 'get'
      }
    }]
}

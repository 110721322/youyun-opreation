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
      placeholder: "请输入商户号",
      options: [
        {
          label: '服务商ID',
          value: 'agentNo'
        },
        {
          label: '服务商名称',
          value: 'agentName'
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operateUserNo',
      class: "clear_both",
      urlOptions: {
        url: apiAgent.queryAllOperation,
        keyName: 'operationId',
        valueName: 'operationName',
        method: 'get'
      }
    }
  ]
}

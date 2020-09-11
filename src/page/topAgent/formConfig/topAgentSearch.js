import apiAgent from "@/api/api_agent.js";
export const FORM_CONFIG = {
  formData: [
    {
      type: 10,
      label: '服务商名称/ID',
      key: '',
      class: 'max-width',
      options: [
        {
          label: '服务商ID',
          value: 'channelAgentCode'
        },
        {
          label: '服务商名称',
          value: 'channelAgentName'
        }
      ],
      labelWidth: '185px'
    },
    {
      type: 0,
      label: '法人姓名',
      key: 'personName',
      style: 'width:294px',
      labelWidth: '185px'
    },
    {
      type: 0,
      label: '法人电话',
      key: 'personMobile',
      style: 'width:294px',
      labelWidth: '185px'
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operationId',
      class: "clear_both",
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
      labelWidth: '185px',
      options: [
        {
          label: '待补全',
          value: 3
        },
        {
          label: '已补全',
          value: 4
        },
        {
          label: '已冻结',
          value: 5
        }
      ]
    }
  ]
}

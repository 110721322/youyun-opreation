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
      type: 0,
      label: '联系人',
      key: 'personName'
    },
    {
      type: 0,
      label: '联系方式',
      key: 'personMobile'
    },
    {
      type: 1,
      label: '审核状态',
      key: 'contractStatus',
      style: 'width:294px',
      options: [
        {
          label: '待审核',
          value: 'audit'
        },
        {
          label: '审核通过',
          value: 'success'
        },
        {
          label: '驳回',
          value: 'reject'
        }
      ]
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operationId',
      style: 'width:294px',
      labelWidth: '185px',
      urlOptions: {
        url: apiAgent.queryAllOperation,
        keyName: 'operationId',
        valueName: 'operationName',
        method: 'get'
      }
    }]
}

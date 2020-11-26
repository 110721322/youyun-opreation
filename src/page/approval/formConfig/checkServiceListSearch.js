import apiAgent from "@/api/api_agent.js";

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      defaultDateType: 'third',
      labelWidth: '80px',
      span: 22
    },
    {
      type: 10,
      label: '筛选',
      key: 'search',
      labelWidth: '80px',
      span: 22,
      options: [
        {
          label: '服务商名称',
          value: 'agentName'
        },
        {
          label: '服务商ID',
          value: 'agentNo'
        }
      ]
    },
    {
      type: 0,
      label: '联系人',
      key: 'personName',
      labelWidth: '80px',
      span: 11
    },
    {
      type: 0,
      label: '联系方式',
      key: 'personMobile',
      labelWidth: '80px',
      span: 11
    },
    {
      type: 1,
      label: '审核状态',
      key: 'contractStatus',
      labelWidth: '80px',
      span: 11,
      options: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '待审核',
          value: 'waitSign'
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

import apiAgent from "@/api/api_agent.js";
export const FORM_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      defaultDateType: 'all',
      labelWidth: '100px',
      span: 22
    },
    {
      type: 0,
      label: '公司名称',
      key: 'agentName',
      labelWidth: '100px',
      span: 11
    },
    {
      type: 0,
      label: '法人姓名',
      key: 'personName',
      labelWidth: '100px',
      span: 11
    },
    {
      type: 0,
      label: '法人手机号',
      key: 'personMobile',
      labelWidth: '100px',
      span: 11
    },
    {
      type: 1,
      label: '服务商类型',
      key: 'businessType',
      labelWidth: '100px',
      span: 11,
      options: [
        {
          label: '企业',
          value: 'enterprise'
        },
        {
          label: '个人',
          value: 'individual'
        }
      ]
    },
    {
      type: 1,
      label: '状态',
      key: 'contractStatus',
      labelWidth: '100px',
      span: 11,
      options: [
        {
          label: '待审核',
          value: 'audit'
        },
        {
          label: '审核拒绝',
          value: 'reject'
        }
      ]
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operationId',
      class: "clear_both",
      labelWidth: '100px',
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

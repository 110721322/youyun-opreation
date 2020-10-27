import apiAgent from "@/api/api_agent.js";
export const FORM_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      querySelectAll: true,
      isSelectToday: true,
      labelWidth: '90px',
      span: 22
    },
    {
      type: 0,
      label: '法人姓名',
      key: 'personName',
      labelWidth: '90px',
      span: 11
    },
    {
      type: 0,
      label: '法人电话',
      key: 'personMobile',
      labelWidth: '90px',
      span: 11
    },
    {
      type: 1,
      label: '服务商类型',
      key: 'businessType',
      labelWidth: '90px',
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
      labelWidth: '90px',
      span: 11,
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
      labelWidth: '90px',
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

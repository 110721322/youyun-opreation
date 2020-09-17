import apiAgent from "@/api/api_agent.js";
export const FORM_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      format: "yyyy-MM-dd HH:mm:ss",
      datatype: "datetimerange",
      labelWidth: '80px',
      span: 24
    },
    {
      type: 0,
      label: '法人姓名',
      key: 'personName',
      labelWidth: '80px',
      span: 11
    },
    {
      type: 0,
      label: '法人电话',
      key: 'personMobile',
      labelWidth: '80px',
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
          value: 'individual'
        },
        {
          label: '个人',
          value: 'enterprise'
        }
      ]
    },
    {
      type: 1,
      label: '状态',
      key: 'contractStatus',
      labelWidth: '80px',
      span: 11,
      options: [
        {
          label: '已拒绝',
          value: 'reject'
        },
        {
          label: '等待',
          value: 'wait'
        },
        {
          label: '审核中',
          value: 'audit'
        },
        {
          label: '审核通过',
          value: 'success'
        }
      ]
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operateUserNo',
      class: "clear_both",
      labelWidth: '80px',
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

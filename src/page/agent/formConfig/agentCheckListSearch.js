import apiAgent from "@/api/api_agent.js";
export const FORM_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      format: "yyyy-MM-dd HH:mm:ss",
      datatype: "datetimerange",
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
          label: '服务商编号',
          value: 'agentNo'
        },
        {
          label: '服务商名字',
          value: 'agentName'
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 0,
      label: '法人姓名',
      key: 'personName',
      style: 'width:294px'
    },
    {
      type: 0,
      label: '法人电话',
      key: 'personMobile',
      style: 'width:294px'
    },
    {
      type: 1,
      label: '服务商类型',
      key: 'businessType',
      style: 'width:294px',
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
      urlOptions: {
        url: apiAgent.queryAllOperation,
        keyName: 'operationId',
        valueName: 'operationName',
        method: 'get'
      }
    }
  ]
}

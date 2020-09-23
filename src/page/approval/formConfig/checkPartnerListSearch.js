// import areaData from "@/assets/data/areaData"
import apiAgent from "@/api/api_agent.js";

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      datatype: 'datetimerange',
      format: 'yyyy-MM-dd HH:mm:ss',
      labelWidth: '80px',
      span: 24
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
      options: [
        {
          label: '所属服务商ID',
          value: 'agentNo'
        },
        {
          label: '所属服务商名称',
          value: 'agentName'
        }
      ],
      labelWidth: '80px',
      span: 24
    },
    {
      type: 0,
      label: '合伙人姓名',
      key: 'partnerName',
      labelWidth: '110px',
      span: 11
    },
    {
      type: 0,
      label: '合伙人手机号',
      key: 'mobile',
      labelWidth: '110px',
      span: 11
    },
    {
      type: 1,
      label: '合伙人类型',
      key: 'jobType',
      labelWidth: '110px',
      span: 11,
      options: [
        {
          label: '拓展员',
          value: 'expander'
        },
        {
          label: '入件操作员',
          value: 'inboundMen'
        }
      ]
    },
    {
      type: 1,
      label: '审核状态',
      key: 'contractStatus',
      labelWidth: '110px',
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
          label: '驳回',
          value: 'reject'
        }
      ]
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operationId',
      labelWidth: '110px',
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

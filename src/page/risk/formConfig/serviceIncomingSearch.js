import api from "@/api/api_risk"

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      labelWidth: '80px',
      querySelectAll: true,
      isSelectToday: true,
      span: 22
    },
    {
      type: 10,
      label: '筛选',
      key: 'search',
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
      labelWidth: '80px',
      span: 22
    },
    {
      type: 1,
      label: '加入人员',
      key: 'operationId',
      labelWidth: '80px',
      span: 11,
      urlOptions: {
        url: api.getAllJobName,
        keyName: 'id',
        valueName: 'jobName',
        method: 'get'
      }
    }
  ]
}

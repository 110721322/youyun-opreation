import areaData from "@/assets/data/areaData";
import apiAgent from "@/api/api_agent.js";
export const SEARCH_CONFIG = {
  formData: [
    {
      type: 10,
      label: '筛选',
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
      labelWidth: '90px',
      span: 22
    },
    {
      type: 8,
      label: '服务地区',
      key: 'area',
      options: areaData,
      labelWidth: '90px',
      span: 11
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operationId',
      labelWidth: '90px',
      span: 11,
      urlOptions: {
        url: apiAgent.queryAllOperation,
        keyName: 'operationId',
        valueName: 'operationName',
        method: 'get'
      }
    },
    {
      type: 1,
      label: '开启权限',
      key: 'privilege',
      labelWidth: '90px',
      span: 11,
      urlOptions: {
        url: apiAgent.queryAllPrivilege,
        keyName: 'privilege',
        valueName: 'privilegeDesc',
        method: 'get'
      }
    }
  ]
}

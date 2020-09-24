import areaData from "@/assets/data/areaData";
import apiAgent from "@/api/api_agent.js";
export const SEARCH_CONFIG = {
  formData: [
    {
      type: 10,
      label: '服务商名称/ID',
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
      labelWidth: '130px',
      span: 22
    },
    {
      type: 8,
      label: '服务地区',
      key: 'area',
      options: areaData,
      labelWidth: '80px',
      span: 11
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
    },
    {
      type: 1,
      label: '开启权限',
      key: 'privilege',
      labelWidth: '80px',
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

import apiAgent from "@/api/api_agent.js";

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 1,
      label: '广告类型',
      key: 'advertType',
      urlOptions: {
        url: apiAgent.queryAllAdvertType,
        keyName: 'advertType',
        valueName: 'advertTypeDesc',
        method: 'get'
      }
    },
    {
      type: 1,
      label: '投放范围',
      key: 'distributeType',
      labelWidth: '135px',
      urlOptions: {
        url: apiAgent.queryAllAdvertDistributeType,
        keyName: 'status',
        valueName: 'statusDesc',
        method: 'get'
      }
    },
    {
      type: 1,
      label: '投放人',
      key: 'operationId',
      urlOptions: {
        url: apiAgent.queryAllOperation,
        keyName: 'operationId',
        valueName: 'operationName',
        method: 'get'
      }
    },
    {
      type: 1,
      label: '状态',
      key: 'status',
      labelWidth: '135px',
      urlOptions: {
        url: apiAgent.queryAllDistributeStatus,
        keyName: 'status',
        valueName: 'statusDesc',
        method: 'get'
      }
    }
  ]
}

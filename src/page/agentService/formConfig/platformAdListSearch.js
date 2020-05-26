import apiAgent from "@/api/api_agent.js";
export const SEARCH_CONFIG = {
  formData: [
    {
      type: 1,
      label: '广告类型',
      key: 'advertType',
      style: 'width:294px',
      urlOptions: {
        url: apiAgent.queryAllAdvertType,
        keyName: 'advertType',
        valueName: 'advertTypeDesc',
        method: 'get'
      }
    }
  ]
}

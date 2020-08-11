import apiAgent from "@/api/api_agent.js";

export const FORM_CONFIG = {
  formData: {
    title: '广告权限',
    showFootBtn: true,
    formData: [
      {
        type: 2,
        label: '广告权限',
        key: 'baseData',
        urlOptions: {
          url: apiAgent.queryAllPrivilege,
          keyName: 'privilege',
          valueName: 'privilegeDesc',
          method: 'get'
        }
      }
    ]
  }
}

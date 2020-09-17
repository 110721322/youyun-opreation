import apiAgent from "@/api/api_agent.js";
export const CHECK_CONFIG = {
  formData: [
    {
      type: 1,
      label: '所属运营',
      key: 'operationId',
      class: "clear_both",
      urlOptions: {
        url: apiAgent.queryEmployeeList,
        keyName: 'id',
        valueName: 'jobName',
        method: 'get'
      }
    }
  ]
}


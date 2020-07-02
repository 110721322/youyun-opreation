import areaData from "@/assets/data/areaData";
import apiAgent from "@/api/api_agent.js";
export const SEARCH_CONFIG = {
  formData: [
    {
      type: 10,
      inputType: 'autocomplete',
      label: '精准筛选',
      class: 'max-width',
      placeholder: "请输入商户",
      options: [
        {
          valueKey: 'agentNo',
          label: '服务商ID',
          value: 'agentNo',
          isAutocomplete: false
        },
        {
          valueKey: 'agentNo',
          label: '服务商名称',
          value: 'agentName',
          isAutocomplete: true,
          api: apiAgent.listAgentByAgentName
        }
      ]
    },
    {
      type: 8,
      label: '服务地区',
      key: 'area',
      options: areaData
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operationId',
      labelWidth: '185px',
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
      class: "clear_both",
      urlOptions: {
        url: apiAgent.queryAllPrivilege,
        keyName: 'privilege',
        valueName: 'privilegeDesc',
        method: 'get'
      }
    }
  ]
}

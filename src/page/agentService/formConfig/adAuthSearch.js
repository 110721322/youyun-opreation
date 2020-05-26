import areaData from "@/assets/data/areaData";
import apiAgent from "@/api/api_agent.js";
export const SEARCH_CONFIG = {
  formData: [
    {
      type: 10,
      label: '精准筛选',
      key: '',
      class: 'max-width',
      placeholder: "请输入商户",
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
      labelWidth: '100px'
    },
    {
      type: 8,
      label: '服务地区',
      key: 'area',
      style: 'width:294px',
      labelWidth: '100px',
      options: areaData
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operationId',
      style: 'width:294px',
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
      style: 'width:294px',
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

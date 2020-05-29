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
    },
    {
      type: 1,
      label: '投放范围',
      key: 'distributeType',
      style: 'width:294px',
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
      style: 'width:294px',
      class: "clear_both",
      options: [
        {
          label: '川菜',
          value: 0
        },
        {
          label: '粤菜',
          value: 1
        },
        {
          label: '杭帮菜',
          value: 2
        }
      ]
    },
    {
      type: 1,
      label: '状态',
      key: 'status',
      style: 'width:294px',
      labelWidth: '135px',
      options: [
        {
          label: '川菜',
          value: 0
        },
        {
          label: '粤菜',
          value: 1
        },
        {
          label: '杭帮菜',
          value: 2
        }
      ]
    }
  ]
}

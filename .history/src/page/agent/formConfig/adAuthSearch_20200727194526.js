import apiAgent from "@/api/api_agent.js";

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 14,
      label: '精准筛选',
      key: '',
      class: 'max-width',
      placeholder: "请输入商户号",
      options: [
        {
          label: '服务商ID',
          value: 'id'
        },
        {
          label: '服务商名称',
          value: 'name'
        }
      ],
      labelWidth: '100px'
    },
    {
      // cascader
      type: 1,
      label: '服务地区',
      key: 'area',
      style: 'width:294px',
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
      label: '所属运营',
      key: 'useChannel',
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
      key: 'channelStatus',
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
    }
  ]
}

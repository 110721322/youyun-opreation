import areaData from "@/assets/data/areaData";
import store from "@/store"
import { AGENT_SEARCH_CONDITION } from "../../../libs/data/permissionBtns";

export const FORM_CONFIG = {
  permission: {
    condition: AGENT_SEARCH_CONDITION
  },
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '100px'
    },
    {
      type: 10,
      label: '精准筛选',
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
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '标签',
      key: 'tags',
      style: 'width:294px',
      options: store.state.dataMarket.labelList
    },
    {
      type: 1,
      label: '所属大区',
      key: 'region',
      style: 'width:294px',
      labelWidth: '185px',
      options: store.state.dataMarket.regionList
    },
    {
      type: 8,
      label: '服务地区',
      key: 'area',
      style: 'width:294px',
      class: "clear_both",
      options: areaData
    },
    {
      type: 1,
      label: '所属运营',
      key: 'oper',
      labelWidth: '185px',
      options: store.state.dataMarket.userList
    }
  ]
}

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
      labelWidth: '80px',
      span: 24
    },
    {
      type: 10,
      label: '精准筛选',
      key: 'agent',
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
      labelWidth: '80px',
      span: 24
    },
    {
      type: 1,
      label: '标签',
      key: 'positionLabelId',
      labelWidth: '80px',
      span: 11,
      options: store.state.dataMarket.tradeLabelList
    },
    {
      type: 1,
      label: '所属大区',
      key: 'regionCode',
      labelWidth: '80px',
      span: 11,
      options: store.state.dataMarket.tradeRegionList
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operationId',
      labelWidth: '80px',
      span: 11,
      options: store.state.dataMarket.tradeUserList
    }
  ]
}

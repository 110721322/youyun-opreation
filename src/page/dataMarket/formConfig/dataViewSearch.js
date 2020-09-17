import areaData from "@/assets/data/areaData";
import store from "@/store";
import { MORE_SEARCH_CONDITION } from "../../../libs/data/permissionBtns";

export const FORM_CONFIG = {
  permission: {
    condition: MORE_SEARCH_CONDITION
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
      type: 1,
      label: '大区',
      key: 'regionCode',
      labelWidth: '50px',
      span: 11,
      options: store.state.dataMarket.regionList
    },
    {
      type: 8,
      label: '地区',
      key: 'area',
      labelWidth: '50px',
      span: 11,
      options: areaData
    },
    {
      type: 1,
      label: '运营人员',
      key: 'operationId',
      labelWidth: '80px',
      span: 11,
      options: store.state.dataMarket.userList
    },
    {
      type: 1,
      label: '标签',
      key: 'positionLabelId',
      labelWidth: '50px',
      span: 11,
      options: store.state.dataMarket.labelList
    },
    {
      type: 1,
      label: '服务商类型',
      key: 'agentGrade',
      labelWidth: '95px',
      span: 11,
      options: [
        {
          label: '顶级服务商',
          value: 0
        },
        {
          label: '服务商',
          value: 1
        }
      ]
    }
  ]
}
export const FORM_CONFIG2 = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      abelWidth: '80px',
      span: 24
    }
  ]
}

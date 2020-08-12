import areaData from "@/assets/data/areaData";
import store from "@/store";
import { MERCHANT_SEARCH_CONDITION } from "../../../libs/data/permissionBtns";

export const FORM_CONFIG = {
  permission: {
    condition: MERCHANT_SEARCH_CONDITION
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
      key: 'field',
      class: 'max-width',
      options: [
        {
          label: '商户ID',
          value: 'merchantNo'
        },
        {
          label: '商户名称',
          value: 'merchantName'
        },
        {
          label: '所属服务商ID',
          value: 'agentNo'
        },
        {
          label: '所属服务商名称',
          value: 'agentName'
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '行业类目',
      key: 'category',
      style: 'width:294px',
      labelWidth: '100px',
      options: store.state.dataMarket.categoryList
    },
    {
      type: 8,
      label: '地区',
      key: 'area',
      style: 'width:294px',
      options: areaData.map(province => {
        province.children = province.children.map(city => {
          city.children = null;
          return city;
        })
        return province;
      }),
      labelWidth: '100px',
      class: "clear_both"
    }
  ]
}

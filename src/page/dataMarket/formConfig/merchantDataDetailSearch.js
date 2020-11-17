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
      labelWidth: '80px',
      span: 22
    },
    {
      type: 10,
      label: '筛选',
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
      labelWidth: '80px',
      span: 22
    },
    {
      type: 1,
      label: '行业类目',
      key: 'category',
      labelWidth: '80px',
      span: 11,
      options: store.state.dataMarket.categoryList
    },
    {
      type: 8,
      label: '地区',
      key: 'area',
      labelWidth: '80px',
      span: 11,
      options: areaData.map(province => {
        province.children = province.children.map(city => {
          city.children = null;
          return city;
        })
        return province;
      }),
      class: "clear_both"
    }
  ]
}

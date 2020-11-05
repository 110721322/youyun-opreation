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
      labelWidth: '80px',
      span: 22
    },
    {
      type: 10,
      label: '精准筛选',
      key: 'search',
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
      span: 22
    },
    // {
    //   type: 1,
    //   label: '标签',
    //   key: 'labelId',
    //   labelWidth: '80px',
    //   span: 11,
    //   options: store.state.dataMarket.labelList
    // },
    {
      type: 1,
      label: '所属大区',
      key: 'regionCode',
      labelWidth: '80px',
      span: 11,
      options: store.state.dataMarket.regionList
    },
    {
      type: 8,
      label: '服务地区',
      key: 'area',
      style: 'width:294px',
      class: "clear_both",
      options: areaData.map($province => {
        $province.children = $province.children.map($city => {
          $city.children = null;
          return $city;
        })
        return $province
      })
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operationId',
      labelWidth: '185px',
      options: store.state.dataMarket.userList
    }
  ]
}

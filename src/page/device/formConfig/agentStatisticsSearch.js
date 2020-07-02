import apiDevice from "@/api/api_device";
import areaData from "@/assets/data/areaData";
export const SEARCH_CONFIG = {
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
          label: '服务商',
          value: 'agentName'
        },
        {
          label: '服务商ID',
          value: 'agentNo'
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '大区',
      key: 'regionCode',
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
      label: '设备型号',
      key: 'deviceId',
      style: 'width:294px',
      labelWidth: '185px',
      urlOptions: {
        url: apiDevice.queryAllDeviceModel,
        keyName: 'deviceId',
        valueName: 'deviceModel',
        method: 'get',
        params: {
          classification: 1
        }
      }
    },
    {
      type: 8,
      label: '地区',
      key: 'city',
      style: 'width:294px',
      class: "clear_both",
      options: areaData
    }
  ]
}

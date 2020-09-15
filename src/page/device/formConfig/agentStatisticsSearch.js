import apiDevice from "@/api/api_device";
import areaData from "@/assets/data/areaData";
export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      labelWidth: '80px',
      span: 20
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
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
      labelWidth: '80px',
      span: 11
    },
    {
      type: 1,
      label: '大区',
      key: 'regionCode',
      labelWidth: '80px',
      span: 11,
      urlOptions: {
        url: apiDevice.queryAllRegion,
        keyName: 'regionCode',
        valueName: 'regionName',
        method: 'get'
      }
    },
    {
      type: 1,
      label: '设备型号',
      key: 'deviceId',
      labelWidth: '80px',
      span: 11,
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
      labelWidth: '80px',
      span: 11,
      options: areaData
    }
  ]
}

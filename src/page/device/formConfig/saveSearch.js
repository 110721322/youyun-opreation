import apiDevice from "@/api/api_device";

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
      type: 1,
      label: '设备型号',
      key: 'deviceId',
      urlOptions: {
        url: apiDevice.queryAllDeviceModel,
        keyName: 'deviceId',
        valueName: 'deviceType',
        method: 'get',
        params: {
          classification: 1
        }
      }
    }
  ]
}

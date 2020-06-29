import apiDevice from "@/api/api_device";

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 1,
      label: '设备型号',
      key: 'deviceModel',
      style: 'width:294px',
      labelWidth: '100px',
      urlOptions: {
        url: apiDevice.queryAllDeviceModel,
        keyName: 'deviceModel',
        valueName: 'deviceModel',
        method: 'get',
        params: {
          classification: 1
        }
      }
    },
    {
      type: 1,
      label: '设备类型',
      key: 'deviceType',
      style: 'width:294px',
      labelWidth: '100px',
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

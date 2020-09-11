import apiDevice from "@/api/api_device";

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 1,
      label: '设备型号',
      key: 'deviceId',
      labelWidth: '100px',
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
      type: 1,
      label: '设备类型',
      key: 'deviceType',
      labelWidth: '100px',
      urlOptions: {
        url: apiDevice.queryAllDeviceTypeModel,
        keyName: 'advertType',
        valueName: 'advertTypeDesc',
        method: 'get',
        params: {
          classification: 1
        }
      }
    }
  ]
}

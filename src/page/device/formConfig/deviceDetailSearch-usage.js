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
      style: 'width:294px',
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
      type: 0,
      label: '设备标识',
      key: 'deviceIdentifier',
      style: 'width:294px'
    },
    {
      type: 0,
      label: '所属服务商',
      key: 'agentNo',
      style: 'width:294px'
    },
    {
      type: 0,
      label: '所属商户',
      key: 'merchantNo',
      style: 'width:294px'
    }
  ]
}

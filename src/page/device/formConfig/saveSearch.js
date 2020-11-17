import apiDevice from "@/api/api_device";

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      datatype: 'datetimerange',
      selectSevenDay: true,
      format: 'yyyy-MM-dd HH:mm:ss',
      labelWidth: '80px',
      span: 22
    },
    {
      type: 1,
      label: '设备型号',
      labelWidth: '80px',
      span: 11,
      key: 'deviceId',
      urlOptions: {
        url: apiDevice.queryAllDeviceModel,
        keyName: 'deviceId',
        valueName: 'deviceModel',
        method: 'get',
        params: {
          classification: 1
        }
      }
    }
  ]
}

import apiDevice from "@/api/api_device";
export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      labelWidth: '80px',
      span: 22
    },
    {
      type: 1,
      label: '设备型号',
      key: 'deviceId',
      abelWidth: '80px',
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
      type: 0,
      label: '设备标识',
      key: 'deviceIdentifier',
      abelWidth: '80px',
      span: 11
    },
    {
      type: 0,
      label: '所属服务商',
      key: 'agentNo',
      abelWidth: '80px',
      span: 11
    },
    {
      type: 0,
      label: '所属商户',
      key: 'merchantNo',
      abelWidth: '80px',
      span: 11
    }
  ]
}

import api from '@/api/api_deviceManage';
export const SEARCH_FORM_CONFIG = {
  formData: [
    {
      type: 1,
      label: '设备类型',
      key: 'deviceType',
      urlOptions: {
        url: api.deviceList,
        keyName: 'typeCode',
        valueName: 'typeName'
      },
      span: 12
    },
    {
      type: 1,
      label: '设备型号',
      key: 'deviceModel',
      urlOptions: {
        url: api.queryDeviceModelPage,
        keyName: 'deviceType',
        valueName: 'deviceModel'
      },
      span: 12
    },
    {
      type: 11,
      label: '添加时间',
      key: 'bindDate',
      span: 12
    }
  ]
}

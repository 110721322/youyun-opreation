import apiDevice from "@/api/api_device";

export const FORM_CONFIG = {
  formData: {
    title: '入库信息',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '设备型号',
        key: 'deviceModel',
        isDisabled: true,
        urlOptions: {
          url: apiDevice.queryAllDeviceModel,
          keyName: 'deviceId',
          valueName: 'deviceType',
          method: 'get',
          params: {
            classification: 1
          }
        }
      },
      {
        type: 11,
        label: '保修截止日期',
        key: 'deadline'
      },
      {
        type: 11,
        label: '入库时间',
        key: 'inputTime'
      },
      {
        type: 0,
        label: '设备标识',
        key: 'deviceIdentifier',
        initVal: ''
      }
    ]
  }
}

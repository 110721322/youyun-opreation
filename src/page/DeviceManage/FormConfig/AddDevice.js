import api from '@/api/api_deviceManage'
export const ADD_DEVICE = {
  deviceData: {
    formData: [
      {
        type: 1,
        label: '设备类型',
        maxlength: 40,
        labelWidth: '120px',
        key: 'deviceType',
        urlOptions: {
          url: api.deviceList,
          keyName: 'typeCode',
          valueName: 'message'
        },
        emitEventBus: "handleDeviceType",
        rules: [
          { required: true, message: '请选择设备类型', trigger: 'change' }
        ]
      },
      {
        type: 0,
        label: '设备型号',
        labelWidth: '120px',
        isSearch: true,
        key: 'deviceModelId',
        urlOptions: {
          url: api.queryDevicetype,
          keyName: 'deviceType',
          valueName: 'deviceModel',
          params: {
            deviceType: ''
          }
        },
        rules: [
          { required: true, message: '请选择设备型号', trigger: 'change' }
        ]
      },
      {
        type: 11,
        label: '设备保修截至时间',
        labelWidth: '120px',
        key: 'guaranteeDate',
        format: 'yyyy-MM-dd',
        rules: [
          { required: true, message: '请选择到期时间', trigger: 'change' }
        ]
      },
      {
        type: 0,
        label: '设备SN码',
        key: 'deviceSn',
        labelWidth: '120px',
        rules: [
          { required: true, message: '请填写设备SN码', trigger: 'blur' }
        ]
      }
    ],
  },
  showSubmit: false,
  showFootBtn: false
}

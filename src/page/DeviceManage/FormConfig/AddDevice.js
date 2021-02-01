import api from '@/api/api_deviceManage'
import commonApi from '@/api/api_common'
export const ADD_DEVICE = {
  deviceData: {
    formData: [
      {
        type: 1,
        label: '设备类型',
        maxlength: 40,
        labelWidth: '140px',
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
        type: 1,
        label: '设备型号',
        labelWidth: '140px',
        isSearch: true,
        key: 'deviceModelId',
        eventName: 'handleDeviceType',
        urlOptions: {
          url: api.queryDevicetype,
          keyName: 'id',
          valueName: 'deviceModel',
          params: {
            deviceType: ''
          }
        },
        isShow: ($row) => {
          return $row.deviceType
        },
        rules: [
          { required: true, message: '请选择设备型号', trigger: 'change' }
        ]
      },
      {
        type: 11,
        label: '设备保修截至时间',
        labelWidth: '140px',
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
        labelWidth: '140px',
        rules: [
          { required: true, message: '请填写设备SN码', trigger: 'blur' }
        ]
      }
    ],
  },
  showSubmit: false,
  showFootBtn: false
}

export const IMPORT_DEVICE = {
  formData: [
    {
      type: 6,
      span: 24,
      label: '上传文件',
      key: 'shopImg',
      labelWidth: '120px',
      urlData: 'excel',
      uploadService: commonApi.queryOssExlToken
    }
  ],
  showSubmit: false,
  showFootBtn: false
}

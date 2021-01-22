import api from '@/api/api_deviceManage'
import commonApi from "@/api/api_common"
export const ADD_DEVICE_MODEL = {
  deviceData: {
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
        rules: [
          { required: true, message: '请选择设备类型', trigger: 'change' }
        ],
        span: 24
      },
      {
        type: 0,
        label: '设备型号',
        key: 'deviceModelId',
        urlOptions: {
          url: api.queryDeviceModelPage,
          keyName: 'deviceType',
          valueName: 'deviceModel'
        },
        rules: [
          { required: true, message: '请选择设备型号', trigger: 'change' }
        ],
        span: 24
      },
      {
        type: 14,
        span: 24,
        label: '图片信息',
        key: 'authImg',
        children: [
          {
            label: '设备图片',
            key: 'idCardPortraitImg',
            type: 6,
            exampleImg: 'https://horse-pay-develop.oss-cn-hangzhou.aliyuncs.com/fund/template/%E8%BA%AB%E4%BB%BD%E8%AF%81%E6%AD%A3%E9%9D%A2.jpg',
            rules: [
              { required: true, message: '请上传设备图片', trigger: 'change' }
            ],
            uploadService: commonApi.queryOssImgToken
          }
        ]
      }
    ],
  },
  showSubmit: false,
  showFootBtn: false
}

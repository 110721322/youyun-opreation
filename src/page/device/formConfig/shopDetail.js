import { setRules } from '@/libs/kit/formFns.js'
import apiDevice from "@/api/api_device";

export const FORM_CONFIG = {
  editData: {
    title: '设备',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '设备类型',
        key: 'deviceType',
        isDisabled: true,
        urlOptions: {
          url: apiDevice.queryAllDeviceTypeModel,
          keyName: 'advertType',
          valueName: 'advertTypeDesc',
          method: 'get',
          params: {
            classification: 1
          }
        }
      },
      {
        type: 1,
        label: '设备型号',
        key: 'deviceId',
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
        type: 0,
        label: '排序',
        key: 'sort',
        style: 'max-width: 294px;',
        rules: setRules('排序').isRequired.get
      },
      {
        type: 6,
        label: '宣传视频',
        key: 'video',
        fileAccept: 'video/*',
        rules: setRules('宣传视频').isRequired.get
      },
      {
        type: 6,
        label: '宣传图片',
        key: 'img',
        maxNum: 5,
        showFileList: true,
        rules: setRules('宣传图片').isRequired.get
      },
      {
        type: 7,
        label: '详情',
        key: 'desc',
        rules: setRules('详情').isRequired.get
      }
    ]
  },
  addData: {
    title: '设备',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '设备类型',
        key: 'deviceType',
        urlOptions: {
          url: apiDevice.queryAllDeviceTypeModel,
          keyName: 'advertType',
          valueName: 'advertTypeDesc',
          method: 'get',
          params: {
            classification: 1
          }
        },
        rules: setRules('详情').isSelected.get
      },
      {
        type: 1,
        label: '设备型号',
        key: 'deviceId',
        urlOptions: {
          url: apiDevice.queryAllDeviceModel,
          keyName: 'deviceId',
          valueName: 'deviceModel',
          method: 'get',
          params: {
            classification: 1
          }
        },
        rules: setRules('详情').isSelected.get
      },
      {
        type: 0,
        label: '排序',
        key: 'sort',
        rules: setRules('排序').isRequired.get
      },
      {
        type: 6,
        label: '宣传视频',
        key: 'video'
      },
      {
        type: 6,
        label: '宣传图片',
        key: 'img',
        maxNum: 5,
        showFileList: true,
        rules: setRules('宣传图片').isSelected.get
      },
      {
        type: 7,
        label: '详情',
        key: 'desc',
        rules: setRules('详情').isSelected.get
      }
    ]
  }
}

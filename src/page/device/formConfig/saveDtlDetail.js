import apiDevice from "@/api/api_device";
import { setRules } from '@/libs/kit/formFns.js'

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
        },
        rules: setRules('设备类型').isSelected.get
      },
      {
        type: 11,
        label: '保修截止日期',
        datatype: 'date',
        format: 'yyyy-MM-dd',
        key: 'deadline',
        rules: setRules('设备类型').isSelected.get
      },
      {
        type: 0,
        label: '设备标识',
        key: 'deviceIdentifier',
        initVal: '',
        rules: setRules('设备类型').isSelected.get
      }
    ]
  }
}

import { setRules } from '@/libs/kit/formFns.js'
import apiDevice from "@/api/api_device";

export const FORM_CONFIG = {
  deviceData: {
    title: '新增入库',
    showFootBtn: true,
    formData: [
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
        rules: setRules('邮箱').isSelected.get
      },
      {
        type: 11,
        label: '保修截止日期',
        format: "yyyy-MM-dd",
        // datatype: "date",
        key: 'deadline',
        rules: setRules('邮箱').isRequired.get
      },
      {
        type: 11,
        label: '入库时间',
        format: "yyyy-MM-dd",
        // datatype: "date",
        key: 'inputTime',
        rules: setRules('公司名称').isRequired.get
      },
      {
        type: 'uploadFile',
        label: '设备标识',
        key: 'deviceIdentifier',
        rules: setRules('设备标识').isSelected.get
      }
    ]
  }
}

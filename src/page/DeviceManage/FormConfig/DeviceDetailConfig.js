export const DEVICE_FORM_CONFIG = {
  deviceInfoData: [
    {
      label: "设备ID",
      key: "deviceNo"
    },
    {
      label: "设备SN",
      key: "deviceSn"
    },
    {
      label: "设备类型",
      key: "deviceName"
    },
    {
      label: "设备型号",
      key: "deviceModel"
    },
    {
      label: "设备状态",
      key: "currentStatus",
      //TODO review: 若无用请删除
      render: (params) => {

      }
    },
    {
      label: "添加人",
      key: "creator"
    },
    {
      label: "添加时间",
      key: "currentStatusDate"
    },
    {
      label: "保修到期时间",
      key: "guaranteeDate"
    }
  ]
}

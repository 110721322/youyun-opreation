import apiDevice from "@/api/api_device";

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      querySelectAll: true,
      isSelectToday: true,
      labelWidth: '80px',
      span: 22
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
      options: [
        {
          label: '设备标识',
          value: 'deviceIdentifier'
        },
        {
          label: '所属商户',
          value: 'merchantNo'
        },
        {
          label: '所属服务商',
          value: 'agentNo'
        }
      ],
      labelWidth: '80px',
      span: 22
    },
    {
      type: 1,
      label: '设备型号',
      key: 'deviceId',
      labelWidth: '80px',
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
      type: 1,
      label: '设备状态',
      key: 'freezeStatus',
      labelWidth: '80px',
      span: 11,
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 1,
          label: '可用'
        },
        {
          value: 2,
          label: '禁用'
        }
      ]
    }
  ]
}

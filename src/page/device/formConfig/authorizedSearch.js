import api from "@/api/api_device"
export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      datatype: 'datetimerange',
      format: 'yyyy-MM-dd HH:mm:ss',
      labelWidth: '80px',
      span: 20
    },
    {
      type: 0,
      label: '设备标识',
      key: 'deviceIdentifier',
      labelWidth: '80px',
      span: 11
    },
    {
      type: 1,
      label: '设备型号',
      labelWidth: '80px',
      span: 11,
      key: 'deviceId',
      urlOptions: {
        url: api.queryAllDeviceModel,
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
      label: '状态',
      key: 'status',
      labelWidth: '80px',
      span: 11,
      options: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '未激活',
          value: 1
        },
        {
          label: '已激活',
          value: 2
        }
      ]
    }
  ]
}

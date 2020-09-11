import api from "@/api/api_device"
export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      datatype: 'datetimerange',
      format: 'yyyy-MM-dd HH:mm:ss',
      class: 'max-width',
      labelWidth: '100px'
    },
    {
      type: 0,
      label: '设备标识',
      key: 'deviceIdentifier',
      style: 'width:294px',
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '设备型号',
      labelWidth: '100px',
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
      style: 'width:294px',
      labelWidth: '185px',
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

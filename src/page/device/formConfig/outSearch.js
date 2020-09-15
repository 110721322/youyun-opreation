import apiDevice from "@/api/api_device";
import apiAgent from "@/api/api_agent.js";

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      labelWidth: '80px',
      span: 20
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
      class: 'max-width',
      options: [
        {
          label: '购买服务商',
          value: 'agentNo'
        },
        {
          label: '订单号',
          value: 'outputNo'
        }
      ],
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
          label: '激活成功',
          value: 2
        },
        {
          label: '激活失败',
          value: 3
        }
      ]
    },
    {
      type: 1,
      label: '销售人员',
      key: 'saleUserId',
      labelWidth: '80px',
      span: 11,
      urlOptions: {
        url: apiAgent.queryAllOperation,
        keyName: 'operationId',
        valueName: 'operationName',
        method: 'get'
      }
    },
    {
      type: 1,
      label: '出库人员',
      key: 'outputUserId',
      labelWidth: '80px',
      span: 11,
      urlOptions: {
        url: apiAgent.queryAllOperation,
        keyName: 'operationId',
        valueName: 'operationName',
        method: 'get'
      }
    }
  ]
}

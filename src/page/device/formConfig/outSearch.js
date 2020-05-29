import apiDevice from "@/api/api_device";
import apiAgent from "@/api/api_agent.js";

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '100px'
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
      labelWidth: '100px'
    },
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
      style: 'width:294px',
      class: "clear_both",
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
      style: 'width:294px',
      labelWidth: '185px',
      urlOptions: {
        url: apiAgent.queryAllOperation,
        keyName: 'operationId',
        valueName: 'operationName',
        method: 'get'
      }
    }
  ]
}

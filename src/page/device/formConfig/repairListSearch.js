import apiAgent from "@/api/api_agent.js";
import apiDevice from "@/api/api_device";

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
          label: '单号',
          value: 'orderNo'
        },
        {
          label: '所属服务商ID',
          value: 'agentNo'
        },
        {
          label: '所属服务商',
          value: 'agentName'
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '设备名称',
      key: 'deviceId',
      labelWidth: '100px',
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
      labelWidth: '185px',
      urlOptions: {
        url: apiAgent.queryAllDistributeStatus,
        keyName: 'status',
        valueName: 'statusDesc',
        method: 'get'
      }
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operationId',
      labelWidth: '100px',
      class: "clear_both",
      urlOptions: {
        url: apiAgent.queryAllOperation,
        keyName: 'operationId',
        valueName: 'operationName',
        method: 'get'
      }
    }
  ]
}

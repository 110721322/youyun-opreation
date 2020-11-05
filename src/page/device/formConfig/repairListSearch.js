import apiAgent from "@/api/api_agent.js";
import apiDevice from "@/api/api_device";

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      selectSevenDay: true,
      labelWidth: '80px',
      span: 22
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
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
      labelWidth: '80px',
      span: 22
    },
    {
      type: 1,
      label: '设备名称',
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
      labelWidth: '80px',
      span: 11
    },
    {
      type: 1,
      label: '状态',
      key: 'status',
      urlOptions: {
        url: apiDevice.deviceStatusAll,
        keyName: 'advertType',
        valueName: 'advertTypeDesc',
        method: 'get'
      },
      labelWidth: '80px',
      span: 11
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operationId',
      urlOptions: {
        url: apiAgent.queryAllOperation,
        keyName: 'operationId',
        valueName: 'operationName',
        method: 'get'
      },
      labelWidth: '80px',
      span: 11
    }
  ]
}

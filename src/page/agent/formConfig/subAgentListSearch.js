import areaData from "@/assets/data/areaData";
import apiAgent from "@/api/api_agent.js";

export const FORM_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      format: "yyyy-MM-dd HH:mm:ss",
      datatype: "datetimerange",
      labelWidth: '80px',
      span: 22
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
      options: [
        {
          label: '服务商ID',
          value: 'agentNo'
        },
        {
          label: '服务商名称',
          value: 'agentName'
        }
      ],
      labelWidth: '80px',
      span: 22
    },
    {
      type: 1,
      label: '标签',
      key: 'labelId',
      labelWidth: '80px',
      span: 11,
      urlOptions: {
        url: apiAgent.selectByChannelAgentCode,
        keyName: 'id',
        valueName: 'name',
        method: 'get'
      }
    },
    {
      type: 1,
      label: '所属大区',
      key: 'regionCode',
      labelWidth: '80px',
      span: 11,
      urlOptions: {
        url: apiAgent.queryAllRegion,
        keyName: 'regionCode',
        valueName: 'regionName',
        method: 'get'
      }
    },
    {
      type: 8,
      label: '服务地区',
      key: 'area',
      labelWidth: '80px',
      span: 11,
      options: areaData
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operateUserNo',
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
      label: '状态',
      key: 'status',
      labelWidth: '80px',
      span: 11,
      options: [
        {
          label: '待补全',
          value: 'incomplete'
        },
        {
          label: '已补全',
          value: 'complete'
        },
        {
          label: '已冻结',
          value: 'blocked'
        },
        {
          label: '已到期',
          value: 'expired'
        }
      ]
    }
  ]
}

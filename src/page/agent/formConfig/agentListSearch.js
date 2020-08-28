import apiAgent from "@/api/api_agent.js";
import areaData from "@/assets/data/areaData";

export const FORM_CONFIG = {
  formData: [
    {
      type: 10,
      label: '服务商名称/ID',
      key: '',
      class: 'max-width',
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
      labelWidth: '130px'
    },
    {
      type: 0,
      label: '法人姓名',
      key: 'personName',
      labelWidth: '130px'
    },
    {
      type: 0,
      label: '法人电话',
      key: 'personMobile',
      labelWidth: '130px'
    },
    {
      type: 1,
      label: '所属大区',
      key: 'regionCode',
      class: "clear_both",
      labelWidth: '130px',
      urlOptions: {
        url: apiAgent.queryAllRegion,
        keyName: 'regionCode',
        valueName: 'regionName',
        method: 'get'
      }
    },
    {
      type: 1,
      label: '服务商等级',
      key: 'activeScopeType',
      class: "clear_both",
      labelWidth: '130px',
      options: [
        {
          label: '国代',
          value: 'all'
        },
        {
          label: '省代',
          value: 'province'
        },
        {
          label: '市代',
          value: 'city'
        }
      ]
    },
    {
      type: 1,
      label: '标签',
      key: 'labelId',
      style: 'width:294px',
      urlOptions: {
        url: apiAgent.selectByChannelAgentCode,
        keyName: 'id',
        valueName: 'name',
        method: 'get'
      }
    },
    {
      type: 8,
      label: '服务地区',
      key: 'area',
      style: 'width:294px',
      labelWidth: '185px',
      options: areaData
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operateUserNo',
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
      label: '状态',
      key: 'status',
      style: 'width:294px',
      labelWidth: '185px',
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

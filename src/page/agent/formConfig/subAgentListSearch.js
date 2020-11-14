import areaData from "@/assets/data/areaData";
import apiAgent from "@/api/api_agent.js";

export const FORM_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      querySelectAll: true,
      isSelectToday: true,
      labelWidth: '120px',
      span: 22
    },
    {
      type: 10,
      label: '筛选',
      key: 'search',
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
      labelWidth: '120px',
      span: 22
    },
    // {
    //   type: 1,
    //   label: '标签',
    //   key: 'labelId',
    //   labelWidth: '80px',
    //   span: 11,
    //   urlOptions: {
    //     url: apiAgent.selectByChannelAgentCode,
    //     keyName: 'id',
    //     valueName: 'name',
    //     method: 'get'
    //   }
    // },
    {
      type: 1,
      label: '所属大区',
      key: 'regionCode',
      labelWidth: '120px',
      span: 11,
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
      labelWidth: '120px',
      span: 11,
      options: [
        {
          label: '全部',
          value: ''
        },
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
      type: 8,
      label: '服务地区',
      key: 'area',
      labelWidth: '120px',
      span: 11,
      options: areaData
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operateUserNo',
      labelWidth: '120px',
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
      labelWidth: '120px',
      span: 11,
      options: [
        {
          label: '全部',
          value: ''
        },
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

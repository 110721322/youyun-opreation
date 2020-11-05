import store from "@/store";
import apiAgent from "@/api/api_ticketCenter.js";
export const SEARCH_CONFIG = {
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
      key: 'search',
      class: 'max-width',
      options: [
        {
          label: '工单编号',
          value: 'workerOrderNo'
        },
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
      type: 16,
      label: '所属模块',
      label1: '所属模块',
      label2: '所属分类',
      labelWidth: 'auto',
      span: 22,
      key1: 'firstId',
      key2: 'secondId',
      urlOptions1: {
        url: apiAgent.queryFirstClassByPage,
        keyName: 'id',
        valueName: 'menuName',
        method: 'get'
      },
      urlOptions2: {
        url: apiAgent.querySecondClassByPage,
        keyName: 'id',
        valueName: 'menuName',
        method: 'get'
      }
    },
    {
      type: 1,
      label: '处理人员',
      key: 'operatorId',
      labelWidth: '80px',
      span: 11,
      options: store.state.system.employeeList
    },
    {
      type: 1,
      label: '状态',
      key: 'status',
      labelWidth: '80px',
      span: 11,
      options: [
        {
          label: '待处理',
          value: 0
        },
        {
          label: '待评价',
          value: 1
        },
        {
          label: '已完结',
          value: 2
        }
      ]
    }
  ]
}

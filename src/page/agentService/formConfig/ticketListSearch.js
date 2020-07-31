import store from "@/store";
export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      format: "yyyy-MM-dd HH:mm:ss",
      datatype: "datetimerange",
      labelWidth: '100px'
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
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
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '问题模块',
      key: 'questionModule',
      style: 'width:294px',
      options: [
        {
          label: '待审核',
          value: 0
        },
        {
          label: '审核通过',
          value: 1
        },
        {
          label: '驳回',
          value: 2
        }
      ]
    },
    {
      type: 1,
      label: '问题类型',
      key: 'questionType',
      style: 'width:294px',
      labelWidth: '185px',
      options: [
        {
          label: '全部',
          value: ''
        }
      ]
    },
    {
      type: 1,
      label: '处理人员',
      key: 'operatorId',
      style: 'width:294px',
      class: "clear_both",
      options: store.state.system.employeeList
    },
    {
      type: 1,
      label: '状态',
      key: 'status',
      style: 'width:294px',
      labelWidth: '185px',
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

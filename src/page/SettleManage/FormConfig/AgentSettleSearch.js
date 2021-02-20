import api from '@/api/api_agentManage'
export const SEARCH_FORM_CONFIG = {
  formData: [
    {
      type: 0,
      label: '结算ID',
      key: 'settleNo',
      labelWidth: '128px',
      span: 12
    },
    {
      type: 1,
      label: '服务商',
      key: 'agentNo',
      isSearch: true,
      labelWidth: '128px',
      urlOptions: {
        searchKey: 'agentName',
        url: api.queryPageByCondition,
        keyName: 'agentNo',
        valueName: 'agentName',
        params: {
          currentPage: 1,
          pageSize: 20
        }
      },
      span: 12
    },
    {
      type: 9,
      label: '结算时间',
      key: 'date',
      isHiddenBtn: true,
      labelWidth: '128px',
      span: 12
    },
    {
      type: 1,
      label: '处理状态',
      key: 'settleStatus',
      labelWidth: '128px',
      // TODO review: 状态值常量替换
      options: [
        {
          label: '已结算',
          value: 1
        },
        {
          label: '结算中',
          value: 2
        },
        {
          label: '未结算',
          value: 3
        },
        {
          label: '驳回',
          value: 4
        }
      ],
      span: 12
    }
  ]
}

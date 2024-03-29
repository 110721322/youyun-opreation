import api from '@/api/api_agentManage'
import { SettleList } from "@/libs/config/constant.config";

export const SEARCH_FORM_CONFIG = [
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
    options: [
      {
        label: '已结算',
        value: SettleList.SETTLED
      },
      {
        label: '结算中',
        value: SettleList.SETTLE
      },
      {
        label: '未结算',
        value: SettleList.UNSETTLE
      },
      {
        label: '驳回',
        value: SettleList.SETTLE_REJECT
      }
    ],
    span: 12
  }
]

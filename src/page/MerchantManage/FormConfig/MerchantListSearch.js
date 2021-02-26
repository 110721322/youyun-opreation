import api from '@/api/api_agentManage'
import { MerchantList } from "@/libs/config/constant.config";
export const SEARCH_FORM_CONFIG = [
  {
    type: 0,
    label: '商户ID',
    key: 'merchantNo',
    labelWidth: '128px',
    span: 12
  },
  {
    type: 0,
    label: '商户名称',
    key: 'merchantName',
    labelWidth: '128px',
    span: 12
  },
  {
    type: 1,
    label: '所属服务商',
    key: 'agentNo',
    labelWidth: '128px',
    isSearch: true,
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
    type: 1,
    label: '商户状态',
    key: 'isDisabled',
    labelWidth: '128px',
    options: [
      {
        label: '启用',
        value: MerchantList.MERCHANT_OPEN
      },
      {
        label: '禁用',
        value: MerchantList.MERCHANT_DISABLED
      }
    ],
    span: 12
  }
]

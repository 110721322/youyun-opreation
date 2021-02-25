import api from '@/api/api_agentManage'
import api_merchantManage from '@/api/api_merchantManage'
import api_shop from "@/api/api_shop"
export const SEARCH_FORM_CONFIG = [
  {
    type: 0,
    label: '结算单号',
    key: 'settleNo',
    labelWidth: '128px',
    span: 12
  },
  {
    type: 1,
    label: '结算门店',
    key: 'shopNo',
    isSearch: true,
    labelWidth: '128px',
    urlOptions: {
      searchKey: 'shopName',
      url: api_shop.shopQueryByPage,
      keyName: 'shopNo',
      valueName: 'shopName',
      params: {
        currentPage: 1,
        pageSize: 20
      }
    },
    span: 12
  },
  {
    type: 11,
    label: '交易时间',
    key: 'beginDate',
    labelWidth: '128px',
    span: 12
  },
  {
    type: 11,
    label: '到账时间',
    key: 'endDate',
    labelWidth: '128px',
    span: 12
  },
  {
    type: 0,
    label: '门店ID',
    key: 'shopNo',
    labelWidth: '128px',
    span: 12
  },
  {
    type: 1,
    label: '所属服务商',
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
    span: 12,
    emitEventBus: "handleAgentChange",
  },
  {
    label: '所属商户',
    key: 'merchantNo',
    labelWidth: '128px',
    eventName: "handleAgentChange",
    type: 1,
    span: 12,
    isSearch: true,
    urlOptions: {
      url: api_merchantManage.selectByCondition,
      params: {
        agentNo: '',
        currentPage: 1,
        pageSize: 20
      },
      searchKey: "merchantName",
      keyName: "merchantNo",
      valueName: "merchantName"
    }
  }
]
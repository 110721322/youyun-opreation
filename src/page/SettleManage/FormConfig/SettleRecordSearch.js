import api from '@/api/api_agentManage'
import api_merchantManage from '@/api/api_merchantManage'
export const SEARCH_FORM_CONFIG = {
  formData: [
    {
      type: 0,
      label: '结算单号',
      key: 'settleNo',
      labelWidth: '128px',
      span: 11
    },
    {
      type: 0,
      label: '结算门店',
      key: 'settleMerchantName',
      labelWidth: '128px',
      span: 11
    },
    {
      type: 0,
      label: '开户人姓名',
      key: 'name',
      labelWidth: '128px',
      span: 11
    },
    {
      type: 0,
      label: '开户行',
      key: 'bankName',
      labelWidth: '128px',
      span: 11
    },
    {
      type: 11,
      label: '创建时间',
      key: 'createTime',
      labelWidth: '128px',
      span: 11
    },
    {
      type: 11,
      label: '到账时间',
      key: 'receiveTime',
      labelWidth: '128px',
      span: 11
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
      span: 11,
      emitEventBus: "handleAgentChange",
    },
    {
      label: '所属商户',
      key: 'merchantNo',
      labelWidth: '128px',
      eventName: "handleAgentChange",
      type: 1,
      span: 11,
      isSearch: true,
      urlOptions: {
        url: api_merchantManage.selectByCondition,
        params: {
          agentNo: ''
        },
        searchKey: "merchantName",
        keyName: "merchantNo",
        valueName: "merchantName"
      }
    },
    {
      type: 0,
      label: '银行卡号',
      key: 'bankNo',
      labelWidth: '128px',
      span: 11
    }
  ]
}
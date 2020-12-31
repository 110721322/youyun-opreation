import api from '@/api/api_agentManage'
import api_merchantManage from '@/api/api_merchantManage'
export const SEARCH_CONFIG = {
  formData: [
  {
    label: '门店ID',
    key: 'shopNo',
    type: 0,
    span: 12
  },
  {
    label: '门店名称',
    key: 'shopName',
    type: 0,
    span: 12
  },
  {
    label: '服务电话',
    key: 'phone',
    type: 0,
    span: 12
  },
  {
    label: '审核状态',
    key: 'status',
    type: 1,
    span: 12,
    options: [
      {label: "预审核中", value: 0},
      {label: "平台驳回", value: 1},
      {label: "通道审核中", value: 2},
      {label: "通道驳回", value: 3},
      {label: "通道通过", value: 4},
      {label: "微信实名认证中", value: 5},
      {label: "微信认证拒绝", value: 6},
      {label: "微信认证成功", value: 7}
    ]
  },
  {
    type: 1,
    label: '所属服务商',
    key: 'agentNo',
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
    span: 12,
    emitEventBus: "handleAgentChange",
  },
  {
    label: '所属商户',
    key: 'merchantNo',
    eventName: "handleAgentChange",
    type: 1,
    span: 12,
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
    label: '门店状态',
    key: 'isDisabled',
    type: 1,
    span: 12,
    options: [
      {label: "禁用", value: 1},
      {label: "启用", value: 0}
    ]
  }],
  showFootBtn: true
}

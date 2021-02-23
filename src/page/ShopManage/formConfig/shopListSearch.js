import api from '@/api/api_agentManage'
import api_merchantManage from '@/api/api_merchantManage'
import { ShopList } from "@/libs/config/constant.config";
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
      {label: "预审核中", value: ShopList.INQUIRY},
      {label: "平台驳回", value: ShopList.REJECTED},
      {label: "通道审核中", value: ShopList.CHANNEL_REVIEW},
      {label: "通道驳回", value: ShopList.CHANNEL_REJECTED},
      {label: "通道通过", value: ShopList.CHANNEL_PASS},
      {label: "微信审核中", value: ShopList.WECHAT_REVIEW},
      {label: "微信未认证", value: ShopList.WECHAT_IDENTIFY},
      {label: "微信认证拒绝", value: ShopList.WECHAT_REJECTED},
      {label: "已开通", value: ShopList.OPENED}
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
      {label: "禁用", value: ShopList.DISABLE},
      {label: "启用", value: ShopList.ENABLE}
    ]
  }],
  showFootBtn: true
}

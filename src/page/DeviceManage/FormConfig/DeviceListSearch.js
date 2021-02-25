import api from '@/api/api_deviceManage';
import agentApi from '@/api/api_agentManage'
import merchantApi from '@/api/api_merchantManage'
import shopApi from '@/api/api_shop'
import { DeviceList } from "@/libs/config/constant.config";

export const SEARCH_FORM_CONFIG = [
  {
    type: 0,
    label: '设备ID',
    key: 'deviceNo',
    span: 12
  },
  {
    type: 1,
    label: '设备类型',
    key: 'deviceType',
    urlOptions: {
      url: api.deviceList,
      keyName: 'typeCode',
      valueName: 'message'
    },
    span: 12
  },
  {
    type: 1,
    label: '设备型号',
    key: 'deviceModel',
    urlOptions: {
      url: api.queryDeviceModelPage,
      keyName: 'deviceModel',
      valueName: 'deviceModel',
      params: {
        currentPage: 1,
        pageSize: 10000
      }
    },
    span: 12
  },
  {
    type: 0,
    label: '设备SN码',
    key: 'deviceSn',
    span: 12
  },
  {
    type: 11,
    label: '绑定时间',
    key: 'bindDate',
    span: 12
  },
  {
    type: 1,
    label: '绑定门店',
    isSearch: true,
    key: 'shopNo',
    urlOptions: {
      searchKey: 'shopName',
      url: shopApi.shopQueryByPage,
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
    type: 1,
    label: '所属商户',
    key: 'merchantNo',
    isSearch: true,
    urlOptions: {
      url: merchantApi.selectByCondition,
      searchKey: "merchantName",
      keyName: "merchantNo",
      valueName: "merchantName",
      params: {
        currentPage: 1,
        pageSize: 20
      }
    },
    span: 12,
  },
  {
    type: 1,
    label: '绑定状态',
    key: 'currentStatus',
    // TODO review: 常量替换状态值
    options: [
      {
        label: '未划拨',
        value: DeviceList.UNCALL
      },
      {
        label: '未绑定',
        value: DeviceList.UNBIND
      },
      {
        label: '已绑定',
        value: DeviceList.BIND
      }
    ],
    span: 12
  },
  {
    type: 1,
    label: '所属服务商',
    key: 'agentNo',
    isSearch: true,
    urlOptions: {
      searchKey: 'agentName',
      url: agentApi.queryPageByCondition,
      keyName: 'agentNo',
      valueName: 'agentName',
      params: {
        currentPage: 1,
        pageSize: 20
      }
    },
    span: 12
  }
]

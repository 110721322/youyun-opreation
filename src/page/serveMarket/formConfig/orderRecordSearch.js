// import areaData from "@/assets/data/areaData";
// import { setRules } from '@/libs/kit/formFns.js'
export const ORDER_RECORD_SEARCH = {
  formData: [
    {
      type: 9,
      label: "创建时间",
      key: "data",
      initVal: null,
      dateType: "date"
    },
    {
      type: 0,
      label: '订单号',
      key: 'outputNo'
    },
    {
      type: 0,
      label: '联系人',
      key: 'buyerName'
    },
    {
      type: 0,
      label: '联系电话',
      key: 'buyerPhone'
    },
    {
      type: 1,
      label: '订单状态',
      key: 'status',
      options: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '待付款',
          value: 1
        },
        {
          label: '已关闭',
          value: 2
        },
        {
          label: '财务审核中',
          value: 3
        },
        {
          label: '财务驳回',
          value: 4
        },
        {
          label: '待发货',
          value: 5
        },
        {
          label: '已发货',
          value: 6
        },
        {
          label: '发货驳回',
          value: 7
        }
      ]
    }
  ]
}

import areaData from "@/assets/data/areaData";
export const FORM_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '100px'
    },
    {
      type: 10,
      label: '精准筛选',
      key: '',
      class: 'max-width',
      options: [
        {
          label: '商户ID',
          value: 'id'
        },
        {
          label: '商户名称',
          value: 'merchantName'
        },
        {
          label: '所属服务商ID',
          value: 'serviceId'
        },
        {
          label: '所属服务商名称',
          value: 'serviceName'
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '行业类目',
      key: 'kind',
      style: 'width:294px',
      labelWidth: '100px',
      options: [
        {
          label: '川菜',
          value: 0
        },
        {
          label: '粤菜',
          value: 1
        },
        {
          label: '杭帮菜',
          value: 2
        }
      ]
    },
    {
      type: 8,
      label: '地区',
      key: 'area',
      style: 'width:294px',
      labelWidth: '185px',
      options: areaData
    },
    {
      type: 1,
      label: '是否开通会员',
      key: 'member',
      style: 'width:294px',
      labelWidth: '100px',
      class: "clear_both",
      options: [
        {
          label: '川菜',
          value: 0
        },
        {
          label: '粤菜',
          value: 1
        },
        {
          label: '杭帮菜',
          value: 2
        }
      ]
    }
  ]
}

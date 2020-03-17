// import areaData from "@/assets/data/areaData"
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
      type: 0,
      label: '商户ID',
      key: 'id',
      style: 'width:294px',
      labelWidth: '185px'
    },
    {
      type: 0,
      label: '商户名称',
      key: 'merchantName',
      style: 'width:294px',
      labelWidth: '185px'
    },
    // cascader
    {
      type: 0,
      label: '所属服务商ID',
      key: 'serviceId',
      style: 'width:294px',
      labelWidth: '185px'
    },
    {
      type: 0,
      label: '所属服务商名称',
      key: 'serviceName',
      style: 'width:294px',
      labelWidth: '185px'
    },
    {
      type: 1,
      label: '行业类目',
      key: 'kind',
      style: 'width:294px',
      labelWidth: '185px',
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
      // cascader
      type: 1,
      label: '地区',
      key: 'address',
      style: 'width:294px',
      labelWidth: '185px',
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
      type: 1,
      label: '是否开通会员',
      key: 'member',
      style: 'width:294px',
      labelWidth: '185px',
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

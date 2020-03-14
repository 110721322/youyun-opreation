// import areaData from "@/assets/data/areaData"
export const SEARCH_CONFIG = {
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
      label: '服务商ID',
      key: 'id',
      style: 'width:294px'
    },
    {
      type: 0,
      label: '服务商名称',
      key: 'name',
      style: 'width:294px',
      labelWidth: '185px'
    },
    {
      type: 0,
      label: '联系人',
      key: 'concant',
      style: 'width:294px'
    },
    {
      type: 0,
      label: '联系方式',
      key: 'phone',
      style: 'width:294px',
      labelWidth: '185px'
    },
    {
      type: 1,
      label: '审核状态',
      key: 'status',
      style: 'width:294px',
      options: [
        {
          label: '待审核',
          value: 0
        },
        {
          label: '审核通过',
          value: 1
        },
        {
          label: '驳回',
          value: 2
        }
      ]
    },
    {
      type: 1,
      label: '所属运营',
      key: 'oper',
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
    }]
}

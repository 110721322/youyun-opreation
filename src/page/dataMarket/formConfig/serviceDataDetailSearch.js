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
          label: '服务商ID',
          value: 'id'
        },
        {
          label: '服务商名称',
          value: 'serviceName'
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '标签',
      key: 'tags',
      style: 'width:294px',
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
      label: '所属大区',
      key: 'region',
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
      type: 8,
      label: '服务地区',
      key: 'area',
      style: 'width:294px',
      class: "clear_both",
      options: areaData
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
    }
  ]
}

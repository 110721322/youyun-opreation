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
      type: 10,
      label: '精准筛选',
      key: '',
      class: 'max-width',
      placeholder: "",
      options: [
        {
          label: '营业执照编号',
          value: 'banField'
        },
        {
          label: '法人身份证号',
          value: 'banField'
        },
        {
          label: '法人手机号',
          value: 'banField'
        },
        {
          label: '银行卡号',
          value: 'banField'
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '加入人员',
      key: 'operationId',
      style: 'width:294px',
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
    },
    {
      type: 1,
      label: '类型',
      key: 'type',
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

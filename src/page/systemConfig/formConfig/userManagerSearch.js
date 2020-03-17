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
      label: '工号',
      key: 'id',
      style: 'width:294px',
      labelWidth: '100px'
    },
    {
      type: 0,
      label: '成员花名',
      key: 'alias',
      style: 'width:294px',
      labelWidth: '185px'
    },
    {
      type: 0,
      label: '成员姓名',
      key: 'name',
      style: 'width:294px',
      labelWidth: '100px'
    },
    {
      type: 0,
      label: '手机号',
      key: 'phone',
      style: 'width:294px',
      labelWidth: '185px'
    },
    {
      type: 1,
      label: '性别',
      key: 'sex',
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
      type: 1,
      label: '职位',
      key: 'position',
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
      label: '上级',
      key: 'super',
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
    }
  ]
}

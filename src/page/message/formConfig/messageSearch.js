export const SEARCH_CONFIG = {
  formData: [
    {
      type: 0,
      label: '标题',
      key: 'title',
      style: 'width:294px',
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '消息类型',
      key: 'type',
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

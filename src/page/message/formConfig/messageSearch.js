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
      key: 'messageType',
      style: 'width:294px',
      labelWidth: '100px',
      options: [
        {
          label: '弹窗消息',
          value: 1
        },
        {
          label: '普通消息',
          value: 2
        }
      ]
    }
  ]
}

export const SEARCH_CONFIG = {
  formData: [
    {
      type: 0,
      label: '标题',
      key: 'title',
      labelWidth: '60px',
      span: 11
    },
    {
      type: 1,
      label: '消息类型',
      key: 'messageType',
      labelWidth: '80px',
      span: 11,
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

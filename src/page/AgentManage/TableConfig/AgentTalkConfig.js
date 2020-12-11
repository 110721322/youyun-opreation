export const AGENT_TALK_DATA = {
  gridConfig: [
    {
      label: '记录ID',
      prop: 'talkId',
      render: (h, params) => {
        return h(
          'span', 'color: red', params.row.talkId
        )
      }
    },
    {
      label: '沟通时间',
      prop: 'channelTime',
    },
    {
      label: '沟通主题',
      prop: 'theme'
    },
    {
      label: '沟通内容',
      prop: 'themeContent'
    },
    {
      label: '沟通人',
      prop: 'channnelMan'
    }
  ]
}
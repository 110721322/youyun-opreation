export const AGENT_TALK_DATA = {
  gridConfig: [
    {
      label: '记录ID',
      prop: 'id',
      render: (h, params) => {
        return h(
          'span', { 'class': 'tab-color' }, params.row.id
        )
      }
    },
    {
      label: '沟通时间',
      prop: 'createTime',
    },
    {
      label: '沟通主题',
      prop: 'theme'
    },
    {
      label: '沟通内容',
      prop: 'content'
    },
    {
      label: '沟通人',
      prop: 'linkmanName'
    }
  ],
  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: []
  }
}
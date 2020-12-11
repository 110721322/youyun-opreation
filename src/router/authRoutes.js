export const authRoutes = [
  {
    text: '服务商管理',
    type: 'ios-paper',
    path: 'AgentManage',
    name: 'AgentManage',
    isShow: false,
    meta: {
      title: '服务商管理',
      icon: 'AgentManage'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'AgentList',
        text: '服务商列表',
        path: 'AgentList',
        isShow: true,
        meta: {
          title: '服务商列表',
          icon: 'AgentList'
        }
      },
      {
        type: 'ios-grid',
        name: 'AddAgent',
        text: '添加服务商',
        path: 'AddAgent',
        isShow: true,
        meta: {
          title: '添加服务商',
          icon: 'AddAgent'
        }
      }
    ]
  }
]

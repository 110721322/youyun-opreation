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
  },
  {
    text: '商户管理',
    type: 'ios-paper',
    path: 'MerchantManage',
    name: 'MerchantManage',
    isShow: false,
    meta: {
      title: '商户管理',
      icon: 'MerchantManage'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'MerchantList',
        text: '商户列表',
        path: 'MerchantList',
        isShow: true,
        meta: {
          title: '商户列表',
          icon: 'MerchantList'
        }
      }
    ]
  },
  {
    text: '结算管理',
    type: 'ios-paper',
    path: 'SettleManage',
    name: 'SettleManage',
    isShow: false,
    meta: {
      title: '结算管理',
      icon: 'SettleManage'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'SettleRecord',
        text: '店铺结算记录',
        path: 'SettleRecord',
        isShow: true,
        meta: {
          title: '店铺结算记录',
          icon: 'SettleRecord'
        }
      },
      {
        type: 'ios-grid',
        name: 'AgentSettleManage',
        text: '代理商结算管理',
        path: 'AgentSettleManage',
        isShow: true,
        meta: {
          title: '代理商结算管理',
          icon: 'AgentSettleManage'
        }
      }
    ]
  }
]

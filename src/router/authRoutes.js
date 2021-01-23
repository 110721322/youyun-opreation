export const authRoutes = [
  {
    text: '首页',
    name: 'homeIndex',
    meta: {
      title: '首页',
      icon: 'icongongzuotai'
    },
    children: [
      {
        text: '账户中心',
        name: 'accountCenter',
        meta: {
          title: '账户中心',
          icon: ''
        }
      }
    ]
  },
  {
    text: '服务商管理',
    name: 'AgentManage',
    meta: {
      title: '服务商管理',
      icon: 'iconfuwushang'
    },
    children: [
      {
        text: '服务商列表',
        name: 'AgentList',
        meta: {
          title: '服务商列表',
          icon: ''
        }
      },
      {
        text: '添加服务商',
        name: 'AddAgent',
        meta: {
          title: '添加服务商',
          icon: ''
        }
      }
    ]
  },
  {
    text: '商户管理',
    name: 'MerchantManage',
    meta: {
      title: '商户管理',
      icon: 'icongongyingshangxinxi'
    },
    children: [
      {
        text: '商户列表',
        name: 'MerchantList',
        meta: {
          title: '商户列表',
          icon: ''
        }
      }
    ]
  },
  {
    text: '门店管理',
    name: 'shopManage',
    meta: {
      title: '门店管理',
      icon: 'iconshanghu'
    },
    children: [
      {
        text: '门店列表',
        name: 'shopList',
        meta: {
          title: '门店列表',
          icon: ''
        }
      }
    ]
  },
  {
    text: '结算管理',
    name: 'SettleManage',
    meta: {
      title: '结算管理',
      icon: 'iconduizhang'
    },
    children: [
      {
        text: '代理商结算管理',
        name: 'AgentSettleManage',
        meta: {
          title: '代理商结算管理',
          icon: ''
        }
      }
    ]
  },
  {
    text: '分润管理',
    name: 'profitAdmin',
    meta: {
      title: '分润管理',
      icon: 'iconjiaoyi'
    },
    children: [
      {
        text: '分润统计',
        name: 'profitStatistics',
        meta: {
          title: '分润统计',
          icon: ''
        }
      }
    ]
  },
  {
    text: '订单管理',
    name: 'orderManage',
    meta: {
      title: '订单管理',
      icon: 'iconjiaoyi'
    },
    children: [
      {
        text: '交易流水',
        name: 'transactionFlow',
        meta: {
          title: '交易流水',
          icon: ''
        }
      }
    ]
  },
  {
    text: '用户管理',
    name: 'accountManage',
    meta: {
      title: '用户管理',
      icon: 'iconyonghuguanli'
    },
    children: [
      {
        text: '账户列表',
        name: 'accountList',
        meta: {
          title: '账户列表',
          icon: ''
        }
      },
      {
        text: '权限配置',
        name: 'roleList',
        meta: {
          title: '权限配置',
          icon: ''
        }
      }
    ]
  }
]

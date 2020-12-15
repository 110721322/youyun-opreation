export const authRoutes = [
  {
    text: '首页',
    type: 'ios-paper',
    path: 'homeIndex',
    name: 'homeIndex',
    isShow: true,
    meta: {
      title: '首页',
      icon: '首页'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'accountCenter',
        text: '账户中心',
        path: 'accountCenter',
        isShow: true,
        meta: {
          title: '账户中心',
          icon: 'merchant-list'
        },
        children: []
      }
    ]
  },
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
    text: '门店管理',
    type: 'ios-paper',
    path: 'shopManage',
    name: 'shopManage',
    isShow: true,
    meta: {
      title: '门店管理',
      icon: '门店管理'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'shopList',
        text: '门店列表',
        path: 'shopList',
        isShow: true,
        meta: {
          title: '门店列表',
          icon: 'merchant-list'
        },
        children: []
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
  },
  {
    text: '订单管理',
    type: 'ios-paper',
    path: 'orderManage',
    name: 'orderManage',
    isShow: true,
    meta: {
      title: '订单管理',
      icon: '订单管理'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'transactionFlow',
        text: '交易流水',
        path: 'transactionFlow',
        isShow: true,
        meta: {
          title: '交易流水',
          icon: 'merchant-list'
        },
        children: []
      }
    ]
  }
]

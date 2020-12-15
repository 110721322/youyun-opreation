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

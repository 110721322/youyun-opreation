export const authRoutes = [
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
  }
]

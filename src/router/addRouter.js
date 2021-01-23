import Layout from '@/layout/index.vue'
const asyncRoutes = {
  homeIndex: {
    path: '/homeIndex',
    name: 'homeIndex',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'homeIndex'
    },
    children: []
  },
  'accountCenter': {
    path: '/accountCenter',
    name: 'accountCenter',
    meta: {
      title: '账户中心',
      icon: 'accountCenter'
    },
    component: () => import('@/page/Home/AccountCenter/AccountCenter.vue'),
    children: []
  },
  DataCenter: {
    path: '/DataCenter',
    name: 'DataCenter',
    meta: {
      title: '数据统计',
      icon: ''
    },
    component: () => import('@/page/Home/DataCenter.vue'),
    children: []
  },
  AgentManage: {
    path: '/AgentManage',
    name: 'AgentManage',
    component: Layout,
    meta: {
      title: '服务商管理',
      icon: 'AgentManage'
    },
    children:[
      {
        path: '/AgentManage/AgentList/AgentDetail',
        name: 'AgentDetail',
        meta: {
          title: '服务商详情',
          icon: 'AgentDetail',
        },
        component: () => import('@/page/AgentManage/AgentDetail.vue'),
      }
    ]
  },
  'AgentList': {
    path: '/AgentList',
    name: 'AgentList',
    meta: {
      title: '服务商列表',
      icon: 'AgentList'
    },
    component: () => import('@/page/AgentManage/AgentList.vue'),
    children: []
  },
  'AddAgent': {
    path: '/AddAgent',
    name: 'AddAgent',
    meta: {
      title: '添加服务商',
      icon: 'AddAgent'
    },
    component: () => import('@/page/AgentManage/AddAgent.vue')
  },
  MerchantManage: {
    path: '/MerchantManage',
    name: 'MerchantManage',
    component: Layout,
    meta: {
      title: '商户管理',
      icon: 'MerchantManage'
    },
    children:[
      {
        path: '/MerchantManage/MerchantList/MerchantDetail',
        name: 'MerchantDetail',
        meta: {
          title: '商户详情',
          icon: 'MerchantDetail',
        },
        component: () => import('@/page/MerchantManage/MerchantDetail.vue'),
      }
    ]
  },
  'MerchantList': {
    path: '/MerchantList',
    name: 'MerchantList',
    meta: {
      title: '商户列表',
      icon: 'MerchantList'
    },
    component: () => import('@/page/MerchantManage/MerchantList.vue')
  },
  shopManage: {
    path: '/shopManage',
    name: 'shopManage',
    component: Layout,
    meta: {
      title: '门店管理',
      icon: 'shopManage'
    },
    children: [
      {
        path: '/shopManage/shopList/shopDetail',
        name: 'shopDetail',
        meta: {
          title: '门店详情',
          fatherName: 'shopList',
          parentName: 'shopManage',
          icon: 'shopDetail',
          keepAlive: 'ShopDetail'
        },
        component: () => import('@/page/ShopManage/ShopList/ShopDetail.vue'),
      },
      {
        path: '/shopManage/shopList/shopDetail/editShop',
        name: 'editShop',
        meta: {
          title: '编辑',
          fatherName: 'shopDetail',
          parentName: 'shopManage',
          icon: 'editShop',
          keepAlive: 'EditShop'
        },
        component: () => import('@/page/ShopManage/ShopList/EditShop.vue'),
        children: []
      }
    ]
  },
  'shopList': {
    path: '/shopList',
    name: 'shopList',
    meta: {
      title: '门店列表',
      icon: 'shopList',
      keepAlive: "ShopList"
    },
    component: () => import('@/page/ShopManage/ShopList/ShopList.vue'),
    children: [
    ]
  },
  SettleManage: {
    path: '/SettleManage',
    name: 'SettleManage',
    component: Layout,
    meta: {
      title: '结算管理',
      icon: 'SettleManage'
    },
    children: [
      {
        path: '/SettleManage/AgentSettleManage/SettleDetail',
        name: 'SettleDetail',
        meta: {
          title: '详情',
          icon: 'SettleDetail'
        },
        component: () => import('@/page/SettleManage/SettleDetail.vue'),
      }
    ]
  },
  'SettleRecord': {
    path: '/SettleRecord',
    name: 'SettleRecord',
    meta: {
      title: '店铺结算记录',
      icon: 'SettleRecord'
    },
    component: () => import('@/page/SettleManage/SettleRecord.vue')
  },
  'AgentSettleManage': {
    path: '/AgentSettleManage',
    name: 'AgentSettleManage',
    meta: {
      title: '代理商结算管理',
      icon: 'SettleRecord'
    },
    component: () => import('@/page/SettleManage/AgentSettleManage.vue')
  },
  orderManage: {
    path: '/orderManage',
    name: 'orderManage',
    component: Layout,
    meta: {
      title: '订单管理',
      icon: 'orderManage'
    },
    children: [{
      path: '/orderManage/transactionFlow/flowDetail',
      name: 'flowDetail',
      meta: {
        title: '详情',
        fatherName: 'transactionFlow',
        parentName: 'orderManage',
        icon: 'flowDetail',
        keepAlive: 'FlowDetail'
      },
      component: () => import('@/page/OrderManage/TransactionFlow/FlowDetail.vue'),
    }]
  },
  'transactionFlow': {
    path: '/transactionFlow',
    name: 'transactionFlow',
    meta: {
      title: '交易流水',
      icon: 'transactionFlow',
      keepAlive: "TransactionFlow"
    },
    component: () => import('@/page/OrderManage/TransactionFlow/TransactionFlow.vue'),
    children: [
    ]
  },
  accountManage: {
    path: '/accountManage',
    name: 'accountManage',
    meta: {
      title: '用户管理'
    },
    component: Layout,
    children: []
  },
  accountList: {
    path: '/accountList',
    name: 'accountList',
    meta: {
      title: '账户列表'
    },
    component: () => import('@/page/AccountManage/AccountList.vue')
  },
  roleList: {
    path: '/roleList',
    name: 'roleList',
    meta: {
      title: '权限配置'
    },
    component: () => import('@/page/AccountManage/RoleList.vue')
  }
}
const routers = []
const menusToRoutes = function (data) {
  const result = []
  data.forEach(item => {
    const curr = asyncRoutes[item.name];
    if (curr) {
      if (curr.path && curr.path[0] !== "/") {
        curr.path = "/" + curr.path;
      }
      if (item.children && item.children.length > 0) {
        item.children.forEach(item2 => {
          generateRoutes(curr.children, item2)
        })
      }
      result.push(curr)
    } else {
      console.error(`not find page ${item.name} , page's title is ${item.meta.title}`);
    }
  })
  result.push({ path: '*', redirect: '/error' })
  return result
}

const getRouters = function () {
  return routers[0].children
}

const generateRoutes = function (children, item) {
  if (item.name) {
    const page = asyncRoutes[item.name];
    if (page) {
      if (page.path && page.path[0] === "/") {
        page.path = page.path.slice(1)
      }
      children.push(page)
    } else {
      console.error(`not find page ${item.name} , page's title is ${item.meta.title}`);
    }
  }

  if (item.children) {
    item.children.forEach(e => {
      generateRoutes(asyncRoutes[item.name].children, e)
    })
  }
}

export default {
  menusToRoutes: menusToRoutes,
  getRouters: getRouters
}

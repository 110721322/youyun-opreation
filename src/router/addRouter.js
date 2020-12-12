import Layout from '@/layout/index.vue'
const asyncRoutes = {
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

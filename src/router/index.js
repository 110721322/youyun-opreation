import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Layout from '@/layout'
import utils from "../libs/kit/utils";
import currRouter from './addRouter.js'

import Login from '../page/login/login.vue'
import PersonInfo from '../page/personInfo/personInfo.vue'
import Result from '../page/personInfo/result.vue'
import ErrorPage from '../page/404/404.vue'
import noJurisdiction from '../page/401/401.vue'
import RegistSuccess from '../page/login/registSuccess'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/',
          component: () => import('@/page/work/workBench.vue')
        }
      ]
    },
    {
      path: '/index',
      component: Layout,
      children: [
        {
          path: '/index',
          component: () => import('@/page/work/workBench.vue')
        }
      ]
    },
    {
      path: '/login',
      name: '登录页',
      component: Login,
      meta: {
        requireLogin: false
      }
    },
    {
      path: '/personInfo',
      name: '完善个人信息',
      component: PersonInfo,
      meta: {
        requireLogin: false
      }
    },
    {
      path: '/result',
      name: '开通成功',
      component: Result,
      meta: {
        requireLogin: false
      }
    },
    {
      path: '/404',
      name: 'ErrorPage',
      component: ErrorPage,
      meta: {
        requireLogin: false
      }
    },
    {
      path: '/401',
      name: 'noJurisdiction',
      component: noJurisdiction,
      meta: {
        requireLogin: false
      }
    },
    {
      path: '/registSuccess',
      name: "registSuccess",
      component: RegistSuccess,
      meta: {
        requireLogin: false
      }
    },
    {
      path: '*',
      component: ErrorPage
    }
  ]
})

// 全局钩子函数,在跳转之前执行
// import { authRoutes } from "./authRoutes";
const authRoutes = utils.deepClone(store.state.role.routes);
// store.dispatch('setRoleRoutes', authRoutes);
const routerList = currRouter.menusToRoutes(authRoutes);
store.dispatch('saveRoutersArr', utils.deepClone(routerList));

router.addRoutes(routerList);

router.beforeEach((to, from, next) => {
  const routes = store.state.role.routes;
  if (to.path === '/login') {
    next()
    return;
  } else if (to.path === "/" && routes.length > 0) {
    next({name: routes[0].name})
  } else if (routes.length === 0) {
    const accessToken = store.state.admin.accessToken;
    if (accessToken === null || accessToken === '') {
      if (to.path === '/registSuccess') {
        next();
      } else {
        next('/login');
      }
      return;
    }
    next();
    return;
  } else {
    const accessToken = store.state.admin.accessToken;
    if (accessToken === null || accessToken === '') {
      if (to.path === '/registSuccess') {
        next();
      } else {
        next('/login');
      }
      return;
    }
  }
  if (typeof to.query._t !== "undefined") {
    next();
  } else {
    to.query._t = new Date().getTime().toString();
    next(to)
  }
  next()
})

router.beforeEach((to, from, next) => {
  if (store.state.role.routes.length === 0) {
    next();
    return;
  }
  let includeKeepAlive = utils.deepClone(store.state.admin.includeKeepAlive);
  if (!from.query._t) {
    if (to.meta.keepAlive && includeKeepAlive.indexOf(to.meta.keepAlive) === -1) {
      includeKeepAlive.push(to.meta.keepAlive)
      store.dispatch('saveKeepAlive', includeKeepAlive)
    }
  } else if (parseInt(to.query._t) < parseInt(from.query._t)) {
    if (from.meta.keepAlive && includeKeepAlive.indexOf(from.meta.keepAlive) === -1) {
      includeKeepAlive.push(from.meta.keepAlive)
      store.dispatch('saveKeepAlive', includeKeepAlive)
    }
  } else {
    if (to.meta.keepAlive) {
      includeKeepAlive = includeKeepAlive.filter(item => {
        if (item !== to.meta.keepAlive) {
          return item
        }
      })
      store.dispatch('saveKeepAlive', includeKeepAlive)
    }
  }
  next();
})

export default router

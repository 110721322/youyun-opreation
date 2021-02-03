/**
                           _ooOoo_
                          o8888888o
                          88" . "88
                          (| -_- |)
                          O\  =  /O
                       ____/`---'\____
                     .'  \\|     |//  `.
                    /  \\|||  :  |||//  \
                   /  _||||| -:- |||||-  \
                   |   | \\\  -  /// |   |
                   | \_|  ''\---/''  |   |
                   \  .-\__  `-`  ___/-. /
                 ___`. .'  /--.--\  `. . __
              ."" '<  `.___\_<|>_/___.'  >'"".
             | | :  `- \`.;`\ _ /`;.`/ - ` : | |
             \  \ `-.   \_ __\ /__ _/   .-` /  /
        ======`-.____`-.___\_____/___.-`____.-'======
                           `=---='
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                 佛祖保佑       永无BUG
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Layout from '@/layout'
import utils from "youyun-vue-components/global/kit/utils";
import currRouter from './addRouter.js'

import Login from '../page/Login/Login.vue'
import ErrorPage from '../page/404/404.vue'
import noJurisdiction from '../page/401/401.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/'
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
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
      path: '*',
      component: ErrorPage
    }
  ]
})

// 全局钩子函数,在跳转之前执行
// import { authRoutes } from "./authRoutes";
const authRoutes = store.state.role.routes;
// store.dispatch('setRoleRoutes', authRoutes);
const routerList = currRouter.menusToRoutes(authRoutes);
store.dispatch('saveRoutersArr', utils.deepClone(routerList));

router.addRoutes(routerList);

router.beforeEach((to, from, next) => {
  const routes = utils.deepClone(store.state.role.routes);
  if (to.path === '/Login' || to.path === "/LoginStore") {
    next()
    return;
  } else if (to.path === '/register') {
    next()
    return;
  } else if (to.path === "/" && routes.length > 0) {
    let routerName;
    const first = routes[0];
    if (first.children && first.children.length > 0) {
      const second = first.children[0];
      if (second.children && second.children.length > 0) {
        routerName = second.children[0].name
      } else {
        routerName = second.name
      }
    } else {
      routerName = first.name
    }
    next({name: routerName})
  } else if (routes.length === 0) {
    const accessToken = store.state.admin.accessToken;
    if (accessToken === null || accessToken === '') {
      next('/Login');
      return;
    }
    next();
    return;
  } else {
    const accessToken = store.state.admin.accessToken;
    if (accessToken === null || accessToken === '') {
      next('/Login');
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

import Vue from 'vue'
import VueRouter from 'vue-router'

// import api from '@/api/api_common';
// import loginApi from '@/api/api_login';
// import * as g from '../libs/global';
import Layout from '@/layout'

import Login from '../page/login/login.vue'
import ErrorPage from '../page/404/404.vue'
import noJurisdiction from '../page/401/401.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/index',
      component: Layout,
      children: [
        {
          path: '/index',
          component: () => import('@/page/index/index.vue')
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
import currRouter from './addRouter.js'

const menuItems = [

  {
    text: '工作台',
    type: 'ios-paper',
    path: 'work',
    name: 'work',
    isShow: false,
    meta: {
      title: '工作台',
      icon: '工作台'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'work-bench',
        text: '工作台',
        path: 'bench',
        isShow: false,
        meta: {
          title: '工作台',
          icon: 'work-bench'
        }
      },
      {
        type: 'ios-grid',
        name: 'work-todo',
        text: '待办事项',
        path: 'Todo',
        isShow: false,
        meta: {
          title: '待办事项',
          icon: 'work-todo'
        }
      },
      {
        type: 'ios-grid',
        name: 'work-sentMessage',
        text: '短信群发',
        path: 'sentMessage',
        isShow: false,
        meta: {
          title: '短信群发',
          icon: 'work-sentMessage'
        }
      },
      {
        type: 'ios-grid',
        name: 'taskDetail',
        text: '日常任务详情',
        path: 'taskDetail',
        isShow: false,
        meta: {
          title: '日常任务详情',
          icon: 'taskDetail'
        }
      },
      {
        type: 'ios-grid',
        name: 'approvalDetail',
        text: '审批任务详情',
        path: 'approvalDetail',
        isShow: false,
        meta: {
          title: '日常任务详情',
          icon: 'approvalDetail'
        }
      }
    ]
  },
  {
    text: '商户管理',
    type: 'ios-paper',
    path: 'merchant',
    name: 'merchant',
    isShow: true,
    meta: {
      title: '商户管理',
      icon: '商户管理'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'merchantList',
        text: '商户列表',
        path: 'list',
        isShow: true,
        meta: {
          title: '商户列表',
          icon: 'merchant-list'
        }
      },
      {
        type: 'ios-grid',
        name: 'merchantSetRecord',
        text: '结算记录',
        path: 'setRecord',
        isShow: true,
        meta: {
          title: '结算记录',
          icon: 'merchant-setRecord'
        }
      }
    ]
  },
  {
    text: '服务商管理',
    type: 'ios-paper',
    path: 'agent',
    name: 'agent',
    isShow: true,
    meta: {
      title: '服务商管理',
      icon: '服务商管理'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'agentList',
        text: '服务商列表',
        path: 'list',
        isShow: true,
        meta: {
          title: '服务商列表',
          icon: 'agent-list'
        }
      },
      {
        type: 'ios-grid',
        name: 'agentSubList',
        text: '下级服务商列表',
        path: 'subList',
        isShow: true,
        meta: {
          title: '下级服务商列表',
          icon: 'agent-subList'
        }
      },
      {
        type: 'ios-grid',
        name: 'agentCheckList',
        text: '服务商审核列表',
        path: 'checkList',
        isShow: true,
        meta: {
          title: '服务商审核列表',
          icon: 'agentCheckList'
        }
      }
    ]
  },

  {
    text: '消息管理',
    type: 'ios-paper',
    path: 'message',
    name: 'message',
    isShow: true,
    meta: {
      title: '消息管理',
      icon: '消息管理'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'serviceAnnouncementList',
        text: '服务商公告',
        path: 'serviceAnnouncementList',
        isShow: true,
        meta: {
          title: '服务商公告',
          icon: 'serviceAnnouncementList'
        }
      },
      {
        type: 'ios-grid',
        name: 'announcementEdit',
        text: '编辑服务商公告',
        path: 'announcementEdit',
        isShow: false,
        meta: {
          title: '编辑服务商公告',
          icon: 'announcementEdit'
        }
      }
    ]
  },
  {
    text: '运营数据',
    type: 'ios-paper',
    path: 'task',
    name: 'task',
    isShow: true,
    meta: {
      title: '运营数据',
      icon: '运营数据'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'statisticsDetail',
        text: '工作任务统计',
        path: 'statisticsDetail',
        isShow: true,
        meta: {
          title: '工作任务统计',
          icon: 'statisticsDetail'
        }
      }
    ]
  },
  {
    text: '数据大盘',
    type: 'ios-paper',
    path: 'dataMarket',
    name: 'dataMarket',
    isShow: true,
    meta: {
      title: '数据大盘',
      icon: '数据大盘'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'transactionData',
        text: '交易数据',
        path: 'transactionData',
        isShow: true,
        meta: {
          title: '交易数据',
          icon: 'transactionData'
        }
      },
      {
        type: 'ios-grid',
        name: 'merchantData',
        text: '商户数据',
        path: 'merchantData',
        isShow: true,
        meta: {
          title: '商户数据',
          icon: 'merchantData'
        }
      },
      {
        type: 'ios-grid',
        name: 'serviceData',
        text: '服务商数据',
        path: 'serviceData',
        isShow: true,
        meta: {
          title: '服务商数据',
          icon: 'serviceData'
        }
      }
    ]
  },
  {
    text: '设备管理',
    type: 'ios-paper',
    path: 'deviceManage',
    name: 'deviceManage',
    isShow: true,
    meta: {
      title: '设备管理',
      icon: '设备管理'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'stock',
        text: '库存管理',
        path: 'stock',
        isShow: true,
        meta: {
          title: '库存管理',
          icon: 'stock'
        },
        children: [
          {
            type: 'ios-grid',
            name: 'stockList',
            text: '设备库存',
            path: 'stockList',
            isShow: true,
            meta: {
              title: '设备库存',
              icon: 'stockList'
            }
          },
          {
            type: 'ios-grid',
            name: 'stockSave',
            text: '入库管理',
            path: 'stockSave',
            isShow: true,
            meta: {
              title: '入库管理',
              icon: 'stockSave'
            }
          },
          {
            type: 'ios-grid',
            name: 'stockOut',
            text: '出库管理',
            path: 'stockOut',
            isShow: true,
            meta: {
              title: '出库管理',
              icon: 'stockOut'
            }
          }
        ]
      },
      {
        type: 'ios-grid',
        name: 'usageManage',
        text: '设备使用管理',
        path: 'usageManage',
        isShow: true,
        meta: {
          title: '设备使用管理',
          icon: 'usageManage'
        },
        children: [
          {
            type: 'ios-grid',
            name: 'usageList',
            text: '设备使用列表',
            path: 'usageList',
            isShow: true,
            meta: {
              title: '设备使用列表',
              icon: 'usageList'
            }
          },
          {
            type: 'ios-grid',
            name: 'repairList',
            text: '设备维修',
            path: 'repairList',
            isShow: true,
            meta: {
              title: '设备维修',
              icon: 'repairList'
            }
          },
          {
            type: 'ios-grid',
            name: 'deviceData',
            text: '设备数据',
            path: 'deviceData',
            isShow: true,
            meta: {
              title: '设备数据',
              icon: 'deviceData'
            }
          }
        ]
      },
      {
        type: 'ios-grid',
        name: 'shopCenter',
        text: '商城管理',
        path: 'shopCenter',
        isShow: true,
        meta: {
          title: '商城管理',
          icon: 'shopCenter'
        }
      }

    ]
  },
  {
    text: '审核与签约',
    type: 'ios-paper',
    path: 'check',
    name: 'check',
    isShow: true,
    meta: {
      title: '审核与签约',
      icon: '审核与签约'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'checkMerchant',
        text: '商户审核',
        path: 'checkMerchant',
        isShow: true,
        meta: {
          title: '商户审核',
          icon: 'checkMerchant'
        },
        children: [
          {
            type: 'ios-grid',
            name: 'indirectList',
            text: '间连审核',
            path: 'indirectList',
            isShow: true,
            meta: {
              title: '间连审核',
              icon: 'indirectCheck'
            }
          }
          // ,
          // {
          //   type: 'ios-grid',
          //   name: 'settlementUpdata',
          //   text: '结算卡修改审核',
          //   path: 'settlementUpdata',
          //   isShow: true,
          //   meta: {
          //     title: '结算卡修改审核',
          //     icon: 'settlementUpdata'
          //   }
          // },
          // {
          //   type: 'ios-grid',
          //   name: 'aliDirectCheck',
          //   text: '支付宝直连审核',
          //   path: 'aliDirectCheck',
          //   isShow: true,
          //   meta: {
          //     title: '支付宝直连审核',
          //     icon: 'aliDirectCheck'
          //   }
          // },
          // {
          //   type: 'ios-grid',
          //   name: 'wxDirectCheck',
          //   text: '微信直连审核',
          //   path: 'wxDirectCheck',
          //   isShow: true,
          //   meta: {
          //     title: '微信直连审核',
          //     icon: 'wxDirectCheck'
          //   }
          // }
        ]
      }
    ]
  }
  //   {
  //     text: 'index2',
  //     type: 'ios-paper',
  //     name: 'index2',
  //     path: 'index2',
  //     meta: {
  //       title: 'index2',
  //       icon: 'index2'
  //     }
  //   },
  //   {
  //     text: 'index3',
  //     type: 'ios-paper',
  //     name: 'index3',
  //     path: 'index3',
  //     meta: {
  //       title: 'index3',
  //       icon: 'index3'
  //     }
  //   }
]
localStorage.setItem('menus', JSON.stringify(menuItems))

console.log(currRouter.menusToRoutes(menuItems));
router.addRoutes(currRouter.menusToRoutes(menuItems))
router.beforeEach((to, from, next) => {
  document.title = '商家管理系统'

  if (to.meta.requireLogin) {
    next()
  } else {
    next()
  }
})

export default router

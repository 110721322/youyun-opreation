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
        name: 'workTodo',
        text: '待办事项',
        path: 'Todo',
        isShow: false,
        meta: {
          title: '待办事项',
          icon: 'workTodo'
        }
      },
      {
        type: 'ios-grid',
        name: 'workSentMessage',
        text: '短信群发',
        path: 'sentMessage',
        isShow: false,
        meta: {
          title: '短信群发',
          icon: 'workSentMessage'
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
      },
      {
        type: 'ios-grid',
        name: 'dividedOverview',
        text: '分润总览',
        path: 'dividedOverview',
        isShow: true,
        meta: {
          title: '分润总览',
          icon: 'dividedOverview'
        }
      },
      {
        type: 'ios-grid',
        name: 'operationApprove',
        text: '运营结算审核',
        path: 'operationApprove',
        isShow: true,
        meta: {
          title: '运营结算审核',
          icon: 'operationApprove'
        }
      }
    ]
  },

  {
    text: '服务商服务',
    type: 'ios-paper',
    path: 'agentService',
    name: 'agentService',
    isShow: true,
    meta: {
      title: '服务商服务',
      icon: '服务商服务'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'orderManage',
        text: '订单管理',
        path: 'orderManage',
        isShow: true,
        meta: {
          title: '订单管理',
          icon: 'orderManage'
        },
        children: [{
          type: 'ios-grid',
          name: 'hardwareOrder',
          text: '硬件订购订单',
          path: 'hardwareOrder',
          isShow: true,
          meta: {
            title: '硬件订购订单',
            icon: 'hardwareOrder'
          }
        }]
      },
      {
        type: 'ios-grid',
        name: 'adManage',
        text: '广告管理',
        path: 'adManage',
        isShow: true,
        meta: {
          title: '广告管理',
          icon: 'adManage'
        },
        children: [
          {
            type: 'ios-grid',
            name: 'adAuth',
            text: '广告权限',
            path: 'adAuth',
            isShow: true,
            meta: {
              title: '广告权限',
              icon: 'adAuth'
            }
          },
          {
            type: 'ios-grid',
            name: 'platformAdList',
            text: '平台广告列表',
            path: 'platformAdList',
            isShow: true,
            meta: {
              title: '平台广告列表',
              icon: 'platformAdList'
            }
          },
          {
            type: 'ios-grid',
            name: 'adPutList',
            text: '平台广告投放列表',
            path: 'adPutList',
            isShow: true,
            meta: {
              title: '平台广告投放列表',
              icon: 'adPutList'
            }
          }
        ]
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
      icon: 'task'
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
          },
          {
            type: 'ios-grid',
            name: 'authorized',
            text: '设备授权激活',
            path: 'authorized',
            isShow: true,
            meta: {
              title: '设备授权激活',
              icon: 'authorized'
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
    path: 'approval',
    name: 'approval',
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
          },
          {
            type: 'ios-grid',
            name: 'settlementList',
            text: '结算卡修改审核',
            path: 'settlementList',
            isShow: true,
            meta: {
              title: '结算卡修改审核',
              icon: 'settlementList'
            }
          },
          {
            type: 'ios-grid',
            name: 'aliDirectList',
            text: '支付宝直连审核',
            path: 'aliDirectList',
            isShow: true,
            meta: {
              title: '支付宝直连审核',
              icon: 'aliDirectList'
            }
          },
          {
            type: 'ios-grid',
            name: 'wxDirectList',
            text: '微信直连审核',
            path: 'wxDirectList',
            isShow: true,
            meta: {
              title: '微信直连审核',
              icon: 'wxDirectList'
            }
          }
        ]
      },
      {
        type: 'ios-grid',
        name: 'checkService',
        text: '下级服务商审核',
        path: 'checkService',
        isShow: true,
        meta: {
          title: '下级服务商审核',
          icon: 'checkService'
        },
        children: [
          {
            type: 'ios-grid',
            name: 'checkServiceList',
            text: '下级服务商审核',
            path: 'checkServiceList',
            isShow: true,
            meta: {
              title: '下级服务商审核',
              icon: 'checkServiceList'
            }
          }
        ]
      },
      {
        type: 'ios-grid',
        name: 'checkPartner',
        text: '合伙人审核',
        path: 'checkPartner',
        isShow: true,
        meta: {
          title: '合伙人审核',
          icon: 'checkPartner'
        },
        children: [
          {
            type: 'ios-grid',
            name: 'checkPartnerList',
            text: '合伙人审核',
            path: 'checkPartnerList',
            isShow: true,
            meta: {
              title: '合伙人审核',
              icon: 'checkPartnerList'
            }
          }
        ]
      }
    ]
  },
  {
    text: '系统配置',
    type: 'ios-paper',
    name: 'systemConfig',
    path: 'systemConfig',
    isShow: true,
    meta: {
      title: '系统配置',
      icon: 'systemConfig'
    },
    children: [
      {
        text: '成员列表',
        type: 'ios-paper',
        name: 'userList',
        path: 'userList',
        isShow: true,
        meta: {
          title: '成员列表',
          icon: 'userList'
        }
      },
      {
        text: '成员管理',
        type: 'ios-paper',
        name: 'userManager',
        path: 'userManager',
        isShow: true,
        meta: {
          title: '成员管理',
          icon: 'userManager'
        }
      },
      {
        text: '菜单管理',
        type: 'ios-paper',
        name: 'menuManager',
        path: 'menuManager',
        isShow: true,
        meta: {
          title: '菜单管理',
          icon: 'menuManager'
        }
      },
      {
        text: '服务商产品权限',
        type: 'ios-paper',
        name: 'agentPowerManager',
        path: 'agentPowerManager',
        isShow: true,
        meta: {
          title: '服务商产品权限',
          icon: 'agentPowerManager'
        },
        children: [
          {
            text: '后台角色权限',
            type: 'ios-paper',
            name: 'agentPcManager',
            path: 'agentPcManager',
            isShow: true,
            meta: {
              title: '后台角色权限',
              icon: 'agentPcManager'
            }
          },
          {
            text: '小程序角色权限',
            type: 'ios-paper',
            name: 'agentAppletManager',
            path: 'agentAppletManager',
            isShow: true,
            meta: {
              title: '小程序角色权限',
              icon: 'agentAppletManager'
            }
          }
        ]
      },
      {
        text: '权限管理',
        type: 'ios-paper',
        name: 'powerManager',
        path: 'powerManager',
        isShow: true,
        meta: {
          title: '权限管理',
          icon: 'powerManager'
        }
      },
      {
        text: '审批管理',
        type: 'ios-paper',
        name: 'approvalManager',
        path: 'approvalManager',
        isShow: true,
        meta: {
          title: '审批管理',
          icon: 'approvalManager'
        }
      },
      {
        text: '自定义表单',
        type: 'ios-paper',
        name: 'customForm',
        path: 'customForm',
        isShow: true,
        meta: {
          title: '自定义表单',
          icon: 'customForm'
        }
      },
      {
        text: '参数设置',
        type: 'ios-paper',
        name: 'paramSetting',
        path: 'paramSetting',
        isShow: true,
        meta: {
          title: '参数设置',
          icon: 'paramSetting'
        }
      }
    ]
  },
  {
    text: '风控管理',
    type: 'ios-paper',
    path: 'risk',
    name: 'risk',
    isShow: true,
    meta: {
      title: '风控管理',
      icon: '风控管理'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'incomingRisk',
        text: '入件风控',
        path: 'incomingRisk',
        isShow: true,
        meta: {
          title: '入件风控',
          icon: 'incomingRisk'
        },
        children: [
          {
            text: '服务商入件风控',
            type: 'ios-paper',
            name: 'serviceIncomingRisk',
            path: 'serviceIncomingRisk',
            isShow: true,
            meta: {
              title: '服务商入件风控',
              icon: 'serviceIncomingRisk'
            }
          },
          {
            text: '商户入件资料风控',
            type: 'ios-paper',
            name: 'merchantDataIncomingRisk',
            path: 'merchantDataIncomingRisk',
            isShow: true,
            meta: {
              title: '商户入件资料风控',
              icon: 'merchantDataIncomingRisk'
            }
          }
        ]
      },
      {
        type: 'ios-grid',
        name: 'riskAppeal',
        text: '风控申诉管理',
        path: 'riskAppeal',
        isShow: true,
        meta: {
          title: '风控申诉管理',
          icon: 'riskAppeal'
        },
        children: [
          {
            text: '乐刷风控',
            type: 'ios-paper',
            name: 'leRiskList',
            path: 'leRiskList',
            isShow: true,
            meta: {
              title: '乐刷风控',
              icon: 'leRiskList'
            }
          },
          {
            text: '平台商户资料风控',
            type: 'ios-paper',
            name: 'merchantRiskList',
            path: 'merchantRiskList',
            isShow: true,
            meta: {
              title: '平台商户资料风控',
              icon: 'merchantRiskList'
            }
          }
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

// console.log(currRouter.menusToRoutes(menuItems));
const routerList = currRouter.menusToRoutes(menuItems);
localStorage.setItem('routers', JSON.stringify(routerList));
router.addRoutes(routerList);
router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin) {
    next()
  } else {
    next()
  }
})

export default router

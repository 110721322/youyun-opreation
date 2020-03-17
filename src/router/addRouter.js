import Layout from '@/layout/index.vue'

const asyncRoutes = {
  merchant: {
    path: '/merchant',
    name: 'merchant',
    component: Layout,
    meta: {
      title: 'merchant',
      icon: 'merchant'
    },
    children: []
  },
  'merchantList': {
    path: 'list',
    name: 'merchantList',
    meta: {
      title: 'merchantList',
      icon: 'merchantList'
    },
    component: () => import('@/page/merchant/merchantList.vue'),
    children: [
      {
        path: 'detail',
        name: 'merchantDetail',
        meta: {
          title: 'merchantDetail',
          icon: 'merchantDetail'
        },
        component: () => import('@/page/merchant/merchantDetail.vue')
      }
    ]
  },
  'merchantSetRecord': {
    path: 'setRecord',
    name: 'merchantSetRecord',
    meta: {
      title: 'merchantSetRecord',
      icon: 'merchantSetRecord'
    },
    component: () => import('@/page/merchant/setRecord.vue')
  },
  agent: {
    path: '/agent',
    name: 'agent',
    component: Layout,
    meta: {
      title: 'agent',
      icon: 'agent'
    },
    children: []
  },

  'agentList': {
    path: 'list',
    name: 'agentList',
    meta: {
      title: 'agentList',
      icon: 'agentList'
    },
    component: () => import('@/page/agent/agentList.vue'),
    children: [
      {
        path: 'detail',
        name: 'agentDetail',
        meta: {
          fatherName: 'agentList',
          title: 'agentDetail',
          icon: 'agentDetail'
        },
        component: () => import('@/page/agent/agentDetail.vue')
      }
    ]
  },

  'agentSubList': {
    path: 'subList',
    name: 'agentSubList',
    meta: {
      title: 'agentSubList',
      icon: 'agentSubList'
    },
    component: () => import('@/page/agent/subAgentList.vue'),
    children: [
      {
        path: 'detail',
        name: 'agentSubListDetail',
        meta: {
          fatherName: 'agentSubList',
          title: 'agentSubListDetail',
          icon: 'agentSubListDetail'
        },
        component: () => import('@/page/agent/subAgentDetail.vue')
      }
    ]

  },

  'agentCheckList': {
    path: 'checkList',
    name: 'agentCheckList',
    meta: {
      title: 'agentCheckList',
      icon: 'agentCheckList'
    },
    component: () => import('@/page/agent/agentCheckList.vue')
  },

  'dividedOverview': {
    path: 'dividedOverview',
    name: 'dividedOverview',
    meta: {
      title: 'dividedOverview',
      icon: 'dividedOverview'
    },
    component: () => import('@/page/agent/dividedOverview.vue'),
    children: [
      {
        name: 'dividedOverview',
        path: 'detail',
        component: () => import('@/page/agent/dividedOverviewDetail.vue')
      }
    ]
  },
  'operationApprove': {
    path: 'operationApprove',
    name: 'operationApprove',
    meta: {
      title: 'operationApprove',
      icon: 'operationApprove'
    },
    component: () => import('@/page/agent/operationApprove.vue'),
    children: [
    ]
  },

  'work': {
    path: '/work',
    name: 'work',
    component: Layout,
    meta: {
      title: 'work',
      icon: 'work'
    },
    children: [
      {
        name: 'index',
        path: 'work',
        component: () => import('@/page/work/workBench.vue')
      }
    ]
  },

  'work-bench': {
    path: 'bench',
    name: 'workBench',
    meta: {
      title: 'workBench',
      icon: 'workBench'
    },
    component: () => import('@/page/work/workBench.vue'),
    children: []
  },

  'work-todo': {
    path: 'todo',
    name: 'workTodo',
    meta: {
      title: 'workTodo',
      icon: 'workTodo'
    },
    component: () => import('@/page/work/workTodo.vue'),
    children: []
  },

  'work-sentMessage': {
    path: 'sentMessage',
    name: 'workSentMessage',
    meta: {
      title: 'workSentMessage',
      icon: 'workSentMessage'
    },
    component: () => import('@/page/work/workSentMessage.vue'),
    children: []
  },
  'taskDetail': {
    path: 'taskDetail',
    name: 'taskDetail',
    meta: {
      title: 'taskDetail',
      icon: 'taskDetail'
    },
    component: () => import('@/page/work/taskDetail.vue'),
    children: []
  },
  'approvalDetail': {
    path: 'approvalDetail',
    name: 'approvalDetail',
    meta: {
      title: 'approvalDetail',
      icon: 'approvalDetail'
    },
    component: () => import('@/page/work/approvalDetail.vue'),
    children: []
  },
  'message': {
    path: '/message',
    name: 'message',
    component: Layout,
    meta: {
      title: 'message',
      icon: 'message'
    },
    children: []
  },
  'serviceAnnouncementList': {
    path: 'serviceAnnouncementList',
    name: 'serviceAnnouncementList',
    meta: {
      title: 'serviceAnnouncementList',
      icon: 'serviceAnnouncementList'
    },
    component: () => import('@/page/message/serviceAnnouncementList.vue'),
    children: []
  },
  'announcementEdit': {
    path: 'announcementEdit',
    name: 'announcementEdit',
    meta: {
      title: 'announcementEdit',
      icon: 'announcementEdit'
    },
    component: () => import('@/page/message/announcementEdit.vue'),
    children: []
  },
  'task': {
    path: '/task',
    name: 'task',
    component: Layout,
    meta: {
      title: 'task',
      icon: 'task'
    },
    children: []
  },
  'statisticsDetail': {
    path: 'statisticsDetail',
    name: 'statisticsDetail',
    meta: {
      title: 'statisticsDetail',
      icon: 'statisticsDetail'
    },
    component: () => import('@/page/task/statisticsDetail.vue'),
    children: []
  },
  'dataMarket': {
    path: '/dataMarket',
    name: 'dataMarket',
    component: Layout,
    meta: {
      title: 'dataMarket',
      icon: 'dataMarket'
    },
    children: []
  },
  'transactionData': {
    path: 'transactionData',
    name: 'transactionData',
    meta: {
      title: 'transactionData',
      icon: 'transactionData'
    },
    component: () => import('@/page/dataMarket/transactionData.vue'),
    children: []
  },
  'merchantData': {
    path: 'merchantData',
    name: 'merchantData',
    meta: {
      title: 'merchantData',
      icon: 'merchantData'
    },
    component: () => import('@/page/dataMarket/merchantData.vue'),
    children: [
      {
        path: 'detail',
        name: 'merchantData',
        meta: {
          fatherName: 'merchantData',
          title: 'merchantDataDetail',
          icon: 'merchantDataDetail'
        },
        component: () => import('@/page/dataMarket/merchantDataDetail.vue')
      }
    ]
  },
  'serviceData': {
    path: 'serviceData',
    name: 'serviceData',
    meta: {
      title: 'serviceData',
      icon: 'serviceData'
    },
    component: () => import('@/page/dataMarket/serviceData.vue'),
    children: [
      {
        path: 'detail',
        name: 'serviceData',
        meta: {
          fatherName: 'serviceData',
          title: 'serviceDataDetail',
          icon: 'serviceDataDetail'
        },
        component: () => import('@/page/dataMarket/serviceDataDetail.vue')
      }
    ]
  },
  'deviceManage': {
    path: '/deviceManage',
    name: 'deviceManage',
    component: Layout,
    meta: {
      title: 'deviceManage',
      icon: 'deviceManage'
    },
    children: []
  },
  'stock': {
    path: 'stock',
    name: 'stock',
    component: () => import('@/page/device/stock/stock.vue'),
    meta: {
      title: 'stock',
      icon: 'stock'
    },
    children: []
  },
  'stockList': {
    path: 'stockList',
    name: 'stockList',
    component: () => import('@/page/device/stock/stockList.vue'),
    meta: {
      title: 'stockList',
      icon: 'stockList'
    },
    children: []
  },
  'stockSave': {
    path: 'stockSave',
    name: 'stockSave',
    component: () => import('@/page/device/stock/saveManage.vue'),
    meta: {
      title: 'stockSave',
      icon: 'stockSave'
    },
    children: [
      {
        path: 'detail',
        name: 'stockDetail',
        meta: {
          fatherName: 'stockSave',
          title: 'stockDetail',
          icon: 'stockDetail'
        },
        component: () => import('@/page/device/stock/saveDetail.vue')
      }
    ]
  },
  'stockOut': {
    path: 'stockOut',
    name: 'stockOut',
    component: () => import('@/page/device/stock/outManage.vue'),
    meta: {
      title: 'stockOut',
      icon: 'stockOut'
    },
    children: [
      {
        path: 'detail',
        name: 'outDetail',
        meta: {
          fatherName: 'stockOut',
          title: 'outDetail',
          icon: 'outDetail'
        },
        component: () => import('@/page/device/stock/outDetail.vue')
      }
    ]
  },
  'authorized': {
    path: 'authorized',
    name: 'authorized',
    component: () => import('@/page/device/stock/authorized.vue'),
    meta: {
      title: 'authorized',
      icon: 'authorized'
    },
    children: [
    ]
  },
  'usageManage': {
    path: 'usageManage',
    name: 'usageManage',
    component: () => import('@/page/device/usageManage/usageManage.vue'),
    meta: {
      title: 'usageManage',
      icon: 'usageManage'
    },
    children: []
  },
  'usageList': {
    path: 'usageList',
    name: 'usageList',
    component: () => import('@/page/device/usageManage/usageList.vue'),
    meta: {
      title: 'usageList',
      icon: 'usageList'
    },
    children: []
  },
  'repairList': {
    path: 'repairList',
    name: 'repairList',
    component: () => import('@/page/device/usageManage/repairList.vue'),
    meta: {
      title: 'repairList',
      icon: 'repairList'
    },
    children: [
      {
        path: 'detail',
        name: 'repairDetail',
        meta: {
          fatherName: 'repairList',
          title: 'repairDetail',
          icon: 'repairDetail'
        },
        component: () => import('@/page/device/usageManage/repairDetail.vue')
      }
    ]
  },
  'deviceData': {
    path: 'deviceData',
    name: 'deviceData',
    component: () => import('@/page/device/usageManage/deviceData.vue'),
    meta: {
      title: 'deviceData',
      icon: 'deviceData'
    },
    children: []
  },
  'shopCenter': {
    path: 'shopCenter',
    name: 'shopCenter',
    component: () => import('@/page/device/shopCenter/shopCenter.vue'),
    meta: {
      title: 'shopCenter',
      icon: 'shopCenter'
    },
    children: [
      {
        path: 'detail',
        name: 'shopCenterDetail',
        meta: {
          fatherName: 'shopCenter',
          title: 'shopCenterDetail',
          icon: 'shopCenterDetail'
        },
        component: () => import('@/page/device/shopCenter/shopDetail.vue')
      }
    ]
  },
  'approval': {
    path: '/approval',
    name: 'approval',
    component: Layout,
    meta: {
      title: 'approval',
      icon: 'approval'
    },
    children: []
  },
  'checkMerchant': {
    path: 'checkMerchant',
    name: 'checkMerchant',
    component: () => import('@/page/approval/merchantCheck/merchantCheck.vue'),
    meta: {
      title: 'checkMerchant',
      icon: 'checkMerchant'
    },
    children: []
  },
  'indirectList': {
    path: 'indirectList',
    name: 'indirectList',
    component: () => import('@/page/approval/merchantCheck/indirectList.vue'),
    meta: {
      title: 'indirectList',
      icon: 'indirectList'
    },
    children: [
      {
        path: 'detail',
        name: 'indirectListDetail',
        meta: {
          fatherName: 'indirectList',
          title: 'indirectListDetail',
          icon: 'indirectListDetail'
        },
        component: () => import('@/page/approval/merchantCheck/indirectListDetail.vue')
      },
      {
        path: 'recordDetail',
        name: 'indirectRecordDetail',
        meta: {
          fatherName: 'indirectList',
          title: 'indirectRecordDetail',
          icon: 'indirectRecordDetail'
        },
        component: () => import('@/page/approval/merchantCheck/indirectRecordDetail.vue')
      }
    ]
  },
  'settlementList': {
    path: 'settlementList',
    name: 'settlementList',
    component: () => import('@/page/approval/merchantCheck/settlementList.vue'),
    meta: {
      title: 'settlementList',
      icon: 'settlementList'
    },
    children: [
      {
        path: 'detail',
        name: 'settlementListDetail',
        meta: {
          fatherName: 'settlementList',
          title: 'settlementListDetail',
          icon: 'settlementListDetail'
        },
        component: () => import('@/page/approval/merchantCheck/settlementListDetail.vue')
      },
      {
        path: 'recordDetail',
        name: 'settlementRecordDetail',
        meta: {
          fatherName: 'settlementList',
          title: 'settlementRecordDetail',
          icon: 'settlementRecordDetail'
        },
        component: () => import('@/page/approval/merchantCheck/settlementRecordDetail.vue')
      }
    ]
  },
  'aliDirectList': {
    path: 'aliDirectList',
    name: 'aliDirectList',
    component: () => import('@/page/approval/merchantCheck/aliDirectList.vue'),
    meta: {
      title: 'aliDirectList',
      icon: 'aliDirectList'
    },
    children: [
      {
        path: 'detail',
        name: 'aliDirectListDetail',
        meta: {
          fatherName: 'aliDirectList',
          title: 'aliDirectListDetail',
          icon: 'aliDirectListDetail'
        },
        component: () => import('@/page/approval/merchantCheck/aliDirectListDetail.vue')
      },
      {
        path: 'recordDetail',
        name: 'aliDirectRecordDetail',
        meta: {
          fatherName: 'aliDirectList',
          title: 'aliDirectRecordDetail',
          icon: 'aliDirectRecordDetail'
        },
        component: () => import('@/page/approval/merchantCheck/aliDirectRecordDetail.vue')
      }
    ]
  },
  'wxDirectList': {
    path: 'wxDirectList',
    name: 'wxDirectList',
    component: () => import('@/page/approval/merchantCheck/wxDirectList.vue'),
    meta: {
      title: 'wxDirectList',
      icon: 'wxDirectList'
    },
    children: [
      {
        path: 'detail',
        name: 'wxDirectListDetail',
        meta: {
          fatherName: 'wxDirectList',
          title: 'wxDirectListDetail',
          icon: 'wxDirectListDetail'
        },
        component: () => import('@/page/approval/merchantCheck/wxDirectListDetail.vue')
      },
      {
        path: 'recordDetail',
        name: 'wxDirectRecordDetail',
        meta: {
          fatherName: 'wxDirectList',
          title: 'wxDirectRecordDetail',
          icon: 'wxDirectRecordDetail'
        },
        component: () => import('@/page/approval/merchantCheck/wxDirectRecordDetail.vue')
      }
    ]
  },
  'checkService': {
    path: 'checkService',
    name: 'checkService',
    component: () => import('@/page/approval/serviceCheck/serviceCheck.vue'),
    meta: {
      title: 'checkService',
      icon: 'checkService'
    },
    children: []
  },
  'checkServiceList': {
    path: 'checkServiceList',
    name: 'checkServiceList',
    component: () => import('@/page/approval/serviceCheck/checkServiceList.vue'),
    meta: {
      title: 'checkServiceList',
      icon: 'checkServiceList'
    },
    children: [
      {
        path: 'detail',
        name: 'checkServiceListDetail',
        meta: {
          fatherName: 'checkServiceList',
          title: 'checkServiceListDetail',
          icon: 'checkServiceListDetail'
        },
        component: () => import('@/page/approval/serviceCheck/checkServiceListDetail.vue')
      }
    ]
  },
  'checkPartner': {
    path: 'checkPartner',
    name: 'checkPartner',
    component: () => import('@/page/approval/partnerCheck/partnerCheck.vue'),
    meta: {
      title: 'checkPartner',
      icon: 'checkPartner'
    },
    children: []
  },
  'checkPartnerList': {
    path: 'checkPartnerList',
    name: 'checkPartnerList',
    component: () => import('@/page/approval/partnerCheck/checkPartnerList.vue'),
    meta: {
      title: 'checkPartnerList',
      icon: 'checkPartnerList'
    },
    children: [
      {
        path: 'detail',
        name: 'checkPartnerListDetail',
        meta: {
          fatherName: 'checkPartnerList',
          title: 'checkPartnerListDetail',
          icon: 'checkPartnerListDetail'
        },
        component: () => import('@/page/approval/partnerCheck/checkPartnerListDetail.vue')
      }
    ]
  },
  'systemConfig': {
    path: '/systemConfig',
    name: 'systemConfig',
    component: Layout,
    meta: {
      title: 'systemConfig',
      icon: 'systemConfig'
    },
    children: []
  },
  'userList': {
    path: 'userList',
    name: 'userList',
    component: () => import('@/page/systemConfig/userList.vue'),
    meta: {
      title: 'userList',
      icon: 'userList'
    },
    children: []
  },
  'userManager': {
    path: 'userManager',
    name: 'userManager',
    component: () => import('@/page/systemConfig/userManager.vue'),
    meta: {
      title: 'userManager',
      icon: 'userManager'
    },
    children: []
  },
  'menuManager': {
    path: 'menuManager',
    name: 'menuManager',
    component: () => import('@/page/systemConfig/menuManager.vue'),
    meta: {
      title: 'menuManager',
      icon: 'menuManager'
    },
    children: []
  },
  'approvalManager': {
    path: 'approvalManager',
    name: 'approvalManager',
    component: () => import('@/page/systemConfig/approvalManager.vue'),
    meta: {
      title: 'approvalManager',
      icon: 'approvalManager'
    },
    children: []
  },
  'customForm': {
    path: 'customForm',
    name: 'customForm',
    component: () => import('@/page/systemConfig/customForm.vue'),
    meta: {
      title: 'customForm',
      icon: 'customForm'
    },
    children: []
  },
  'paramSetting': {
    path: 'paramSetting',
    name: 'paramSetting',
    component: () => import('@/page/systemConfig/paramSetting.vue'),
    meta: {
      title: 'paramSetting',
      icon: 'paramSetting'
    },
    children: []
  },
  'powerManager': {
    path: 'powerManager',
    name: 'powerManager',
    component: () => import('@/page/systemConfig/powerManager.vue'),
    meta: {
      title: 'powerManager',
      icon: 'powerManager'
    },
    children: [
      {
        path: 'powerBtnManager',
        name: 'powerBtnManager',
        component: () => import('@/page/systemConfig/powerBtnManager.vue'),
        meta: {
          fatherName: 'powerManager',
          title: 'powerBtnManager',
          icon: 'powerBtnManager'
        }
      }
    ]
  },
  'agentPowerManager': {
    path: 'agentPowerManager',
    name: 'agentPowerManager',
    component: () => import('@/page/systemConfig/agentPowerManager/agentPowerManager.vue'),
    meta: {
      title: 'agentPowerManager',
      icon: 'agentPowerManager'
    },
    children: []
  },
  'agentPcManager': {
    path: 'agentPcManager',
    name: 'agentPcManager',
    component: () => import('@/page/systemConfig/agentPowerManager/agentPcManager.vue'),
    meta: {
      title: 'agentPcManager',
      icon: 'agentPcManager'
    },
    children: []
  },
  'agentAppletManager': {
    path: 'agentAppletManager',
    name: 'agentAppletManager',
    component: () => import('@/page/systemConfig/agentPowerManager/agentAppletManager.vue'),
    meta: {
      title: 'agentAppletManager',
      icon: 'agentAppletManager'
    },
    children: []
  }
}
const routers = []
// 传入后台数据 生成路由表

// 将菜单信息转成对应的路由信息 动态添加
const menusToRoutes = function (data) {
  const result = []
  // const children = []

  // result.push({
  //     path: '/merchant',
  //     component: () => import('./index.vue'),
  //     children,
  // })

  data.forEach(item => {
    const curr = asyncRoutes[item.name];
    if (item.children) {
      item.children.forEach(item2 => {
        generateRoutes(curr.children, item2)
      })
    }
    result.push(curr)
  })
  // 最后添加404页面 否则会在登陆成功后跳到404页面
  result.push({ path: '*', redirect: '/error' })
  return result
}

const getRouters = function () {
  return routers[0].children
}

const generateRoutes = function (children, item) {
  if (item.name) {
    children.push(asyncRoutes[item.name])
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

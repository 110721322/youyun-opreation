import Layout from '@/layout/index.vue'
const asyncRoutes = {
  merchant: {
    path: '/merchant',
    name: 'merchant',
    component: Layout,
    meta: {
      title: '商户管理',
      icon: 'merchant'
    },
    children: []
  },
  'merchantList': {
    path: 'list',
    name: 'merchantList',
    meta: {
      title: '商户列表',
      icon: 'merchantList'
    },
    component: () => import('@/page/merchant/merchantList.vue'),
    children: [
      {
        path: 'detail',
        name: 'merchantDetail',
        meta: {
          title: '商户详情',
          icon: 'merchantDetail',
          fatherName: 'merchantList'
        },
        component: () => import('@/page/merchant/merchantDetail.vue')
      }
    ]
  },
  'merchantSetRecord': {
    path: 'setRecord',
    name: 'merchantSetRecord',
    meta: {
      title: '结算记录',
      icon: 'merchantSetRecord'
    },
    component: () => import('@/page/merchant/setRecord.vue')
  },
  agent: {
    path: '/agent',
    name: 'agent',
    component: Layout,
    meta: {
      title: '服务商管理',
      icon: 'agent'
    },
    children: []
  },

  'agentList': {
    path: 'list',
    name: 'agentList',
    meta: {
      title: '服务商列表',
      icon: 'agentList'
    },
    component: () => import('@/page/agent/agentList.vue'),
    children: [
      {
        path: 'detail',
        name: 'agentDetail',
        meta: {
          fatherName: 'agentList',
          title: '服务商详情',
          icon: 'agentDetail'
        },
        component: () => import('@/page/agent/agentDetail.vue')
      }
    ]
  },
  agentService: {
    path: '/agentService',
    name: 'agentService',
    component: Layout,
    meta: {
      title: '服务商服务',
      icon: 'agentService'
    },
    children: []
  },
  'orderManage': {
    path: 'orderManage',
    name: 'orderManage',
    component: () => import('@/page/agentService/orderManage/orderManage.vue'),
    meta: {
      title: '订单管理',
      icon: 'orderManage'
    },
    children: []
  },
  'hardwareOrder': {
    path: 'hardwareOrder',
    name: 'hardwareOrder',
    meta: {
      title: '硬件订购订单',
      subMenuName: 'orderManage',
      icon: 'hardwareOrder'
    },
    component: () => import('@/page/agentService/orderManage/hardwareOrder.vue'),
    children: [{
      path: 'detail',
      name: 'detail',
      meta: {
        title: '详情',
        icon: 'detail'
      },
      component: () => import('@/page/agentService/orderManage/hardwareOrderDetail.vue')
    }]
  },
  'adManage': {
    path: 'adManage',
    name: 'adManage',
    component: () => import('@/page/agentService/adManage/adManage.vue'),
    meta: {
      title: '广告管理',
      icon: 'adManage'
    },
    children: []
  },
  'adAuth': {
    path: 'adAuth',
    name: 'adAuth',
    meta: {
      title: '广告权限',
      subMenuName: 'adManage',
      icon: 'adAuth'
    },
    component: () => import('@/page/agentService/adManage/adAuth.vue'),
    children: []
  },
  'adPutList': {
    path: 'adPutList',
    name: 'adPutList',
    meta: {
      title: '平台广告投放列表',
      subMenuName: 'adManage',
      icon: 'adPutList'
    },
    component: () => import('@/page/agentService/adManage/adPutList.vue'),
    children: [
      {
        path: 'detail',
        name: 'adPutDetail',
        meta: {
          fatherName: 'adPutList',
          title: '详情',
          icon: 'adPutDetail'
        },
        component: () => import('@/page/agentService/adManage/adPutDetail.vue')
      }
    ]
  },
  'platformAdList': {
    path: 'platformAdList',
    name: 'platformAdList',
    meta: {
      title: '平台广告列表',
      subMenuName: 'adManage',
      icon: 'platformAdList'
    },
    component: () => import('@/page/agentService/adManage/platformAdList.vue'),
    children: [
      {
        path: 'detail',
        name: 'platformAdDetail',
        meta: {
          fatherName: 'platformAdList',
          title: '详情',
          icon: 'platformAdDetail'
        },
        component: () => import('@/page/agentService/adManage/platformAdDetail.vue')
      }
    ]
  },
  'renewalRecord': {
    path: 'renewalRecord',
    name: 'renewalRecord',
    meta: {
      title: '到期续费记录',
      icon: 'renewalRecord'
    },
    component: () => import('@/page/agentService/renewalRecord.vue')
  },
  'thirdParty': {
    path: 'thirdParty',
    name: 'thirdParty',
    meta: {
      title: '第三方对接列表',
      icon: 'thirdParty'
    },
    component: () => import('@/page/agentService/thirdParty.vue'),
    children: [
      {
        path: 'detail',
        name: 'detail',
        meta: {
          fatherName: 'thirdParty',
          title: '第三方对接信息',
          icon: 'thirdPartyDetail'
        },
        component: () => import('@/page/agentService/thirdPartyDetail.vue')
      }
    ]
  },
  'ticketCenter': {
    path: 'ticketCenter',
    name: 'ticketCenter',
    meta: {
      title: '工单中心',
      icon: 'ticketCenter'
    },
    component: () => import('@/page/agentService/ticketCenter/ticketCenter.vue'),
    children: []
  },
  'ticketStatistics': {
    path: 'ticketStatistics',
    name: 'ticketStatistics',
    meta: {
      title: '工单统计',
      subMenuName: 'ticketCenter',
      icon: 'ticketStatistics'
    },
    component: () => import('@/page/agentService/ticketCenter/ticketStatistics.vue')
  },
  'ticketList': {
    path: 'ticketList',
    name: 'ticketList',
    meta: {
      title: '工单列表',
      subMenuName: 'ticketCenter',
      icon: 'ticketList'
    },
    component: () => import('@/page/agentService/ticketCenter/ticketList.vue'),
    children: [
      {
        path: 'detail',
        name: 'detail',
        meta: {
          fatherName: 'ticketList',
          title: '工单详情',
          icon: 'ticketListDetail'
        },
        component: () => import('@/page/agentService/ticketCenter/ticketListDetail.vue')
      }
    ]
  },
  'ticketKnowledge': {
    path: 'ticketKnowledge',
    name: 'ticketKnowledge',
    meta: {
      title: '工单知识库',
      subMenuName: 'ticketCenter',
      icon: 'ticketKnowledge'
    },
    component: () => import('@/page/agentService/ticketCenter/ticketKnowledge.vue')
  },
  'agentSubList': {
    path: 'subList',
    name: 'agentSubList',
    meta: {
      title: '下级服务商列表',
      icon: 'agentSubList'
    },
    component: () => import('@/page/agent/subAgentList.vue'),
    children: [
      {
        path: 'detail',
        name: 'agentSubListDetail',
        meta: {
          fatherName: 'agentSubList',
          title: '下级服务商详情',
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
      title: '服务商审核列表',
      icon: 'agentCheckList'
    },
    component: () => import('@/page/agent/agentCheckList.vue')
  },

  'dividedOverview': {
    path: 'dividedOverview',
    name: 'dividedOverview',
    meta: {
      title: '分润总览',
      icon: 'dividedOverview'
    },
    component: () => import('@/page/agent/dividedOverview.vue'),
    children: [
      {
        name: 'dividedOverview',
        path: 'detail',
        component: () => import('@/page/agent/dividedOverviewDetail.vue'),
        meta: {
          title: '商户分润明细',
          icon: 'dividedOverview',
          fatherName: 'dividedOverview'
        }
      }
    ]
  },

  'work': {
    path: '/work',
    name: 'work',
    component: Layout,
    meta: {
      title: '工作台',
      icon: 'work'
    },
    children: [
      {
        name: 'work',
        path: 'work',
        component: () => import('@/page/work/workBench.vue')
      }
    ]
  },

  // 'workBench': {
  //   path: 'bench',
  //   name: 'workBench',
  //   meta: {
  //     title: '工作台',
  //     icon: 'workBench'
  //   },
  //   component: () => import('@/page/work/workBench.vue'),
  //   children: []
  // },

  'workTodo': {
    path: 'todo',
    name: 'workTodo',
    meta: {
      title: '待办事项',
      icon: 'workTodo'
    },
    component: () => import('@/page/work/workTodo.vue'),
    children: []
  },

  'workSentMessage': {
    path: 'sentMessage',
    name: 'workSentMessage',
    meta: {
      title: '短信群发',
      icon: 'workSentMessage'
    },
    component: () => import('@/page/work/workSentMessage.vue'),
    children: []
  },
  'taskDetail': {
    path: 'taskDetail',
    name: 'taskDetail',
    meta: {
      title: '日常任务详情',
      icon: 'taskDetail'
    },
    component: () => import('@/page/work/taskDetail.vue'),
    children: []
  },
  'approvalDetail': {
    path: 'approvalDetail',
    name: 'approvalDetail',
    meta: {
      title: '审批任务详情',
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
      title: '消息管理',
      icon: 'message'
    },
    children: []
  },
  'serviceAnnouncementList': {
    path: 'serviceAnnouncementList',
    name: 'serviceAnnouncementList',
    meta: {
      title: '服务商公告',
      icon: 'serviceAnnouncementList'
    },
    component: () => import('@/page/message/serviceAnnouncementList.vue'),
    children: [
      {
        path: 'detail',
        name: 'detail',
        meta: {
          title: '编辑服务商公告',
          icon: 'detail',
          fatherName: 'serviceAnnouncementList'
        },
        component: () => import('@/page/message/announcementEdit.vue')
      }
    ]
  },

  'task': {
    path: '/task',
    name: 'task',
    component: Layout,
    meta: {
      title: '运营数据',
      icon: 'task'
    },
    children: []
  },
  'statisticsDetail': {
    path: 'statisticsDetail',
    name: 'statisticsDetail',
    meta: {
      title: '工作任务统计',
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
      title: '数据大盘',
      icon: 'dataMarket'
    },
    children: []
  },
  'transactionData': {
    path: 'transactionData',
    name: 'transactionData',
    meta: {
      title: '交易数据',
      icon: 'transactionData'
    },
    component: () => import('@/page/dataMarket/transactionData.vue'),
    children: []
  },
  'merchantData': {
    path: 'merchantData',
    name: 'merchantData',
    meta: {
      title: '商户数据',
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
      title: '服务商数据',
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
      title: '设备管理',
      icon: 'deviceManage'
    },
    children: []
  },
  'stock': {
    path: 'stock',
    name: 'stock',
    component: () => import('@/page/device/stock/stock.vue'),
    meta: {
      title: '库存管理',
      icon: 'stock'
    },
    children: []
  },
  'stockList': {
    path: 'stockList',
    name: 'stockList',
    component: () => import('@/page/device/stock/stockList.vue'),
    meta: {
      title: '设备库存',
      icon: 'stockList',
      subMenuName: 'stock'
    },
    children: []
  },
  'stockSave': {
    path: 'stockSave',
    name: 'stockSave',
    component: () => import('@/page/device/stock/saveManage.vue'),
    meta: {
      title: '入库管理',
      icon: 'stockSave',
      subMenuName: 'stock'
    },
    children: [
      {
        path: 'detail',
        name: 'stockDetail',
        meta: {
          fatherName: 'stockSave',
          title: '入库详情',
          icon: 'stockDetail',
          subMenuName: 'stock'
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
      title: '出库管理',
      icon: 'stockOut',
      subMenuName: 'stock'
    },
    children: [
      {
        path: 'detail',
        name: 'outDetail',
        meta: {
          fatherName: 'stockOut',
          title: '出库详情',
          icon: 'outDetail',
          subMenuName: 'stock'
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
      title: '设备授权激活',
      subMenuName: 'stock',
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
      title: '设备使用管理',
      icon: 'usageManage'
    },
    children: []
  },
  'usageList': {
    path: 'usageList',
    name: 'usageList',
    component: () => import('@/page/device/usageManage/usageList.vue'),
    meta: {
      title: '设备使用列表',
      icon: 'usageList',
      subMenuName: 'usageManage'
    },
    children: []
  },
  'repairList': {
    path: 'repairList',
    name: 'repairList',
    component: () => import('@/page/device/usageManage/repairList.vue'),
    meta: {
      title: '设备维修',
      icon: 'repairList',
      subMenuName: 'usageManage'
    },
    children: [
      {
        path: 'detail',
        name: 'repairDetail',
        meta: {
          fatherName: 'repairList',
          title: '详情',
          icon: 'repairDetail',
          subMenuName: 'usageManage'
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
      title: '设备数据',
      icon: 'deviceData',
      subMenuName: 'usageManage'
    },
    children: []
  },
  'shopCenter': {
    path: 'shopCenter',
    name: 'shopCenter',
    component: () => import('@/page/device/shopCenter/shopCenter.vue'),
    meta: {
      title: '商城管理',
      icon: 'shopCenter'
    },
    children: [
      {
        path: 'detail',
        name: 'shopCenterDetail',
        meta: {
          fatherName: 'shopCenter',
          title: '商城详情',
          icon: 'shopCenterDetail',
          subMenuName: 'usageManage'
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
      title: '审批管理',
      icon: 'approval'
    },
    children: []
  },
  'checkMerchant': {
    path: 'checkMerchant',
    name: 'checkMerchant',
    component: () => import('@/page/approval/merchantCheck/merchantCheck.vue'),
    meta: {
      title: '商户审核',
      icon: 'checkMerchant'
    },
    children: []
  },
  'indirectList': {
    path: 'indirectList',
    name: 'indirectList',
    component: () => import('@/page/approval/merchantCheck/indirectList.vue'),
    meta: {
      title: '间连审核',
      icon: 'indirectList',
      subMenuName: 'checkMerchant'
    },
    children: [
      {
        path: 'detail',
        name: 'indirectListDetail',
        meta: {
          fatherName: 'indirectList',
          title: '间连审核列表',
          icon: 'indirectListDetail',
          subMenuName: 'checkMerchant'
        },
        component: () => import('@/page/approval/merchantCheck/indirectListDetail.vue')
      },
      {
        path: 'recordDetail',
        name: 'indirectRecordDetail',
        meta: {
          fatherName: 'indirectList',
          title: '间连审核详情',
          icon: '间连审核详情',
          subMenuName: 'checkMerchant'
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
      title: '结算卡修改审核',
      icon: 'settlementList',
      subMenuName: 'checkMerchant'
    },
    children: [
      {
        path: 'detail',
        name: 'settlementListDetail',
        meta: {
          fatherName: 'settlementList',
          title: '结算卡修改审核详情',
          icon: 'settlementListDetail',
          subMenuName: 'checkMerchant'
        },
        component: () => import('@/page/approval/merchantCheck/settlementListDetail.vue')
      },
      {
        path: 'recordDetail',
        name: 'settlementRecordDetail',
        meta: {
          fatherName: 'settlementList',
          title: ' 结算卡修改审核记录',
          icon: 'settlementRecordDetail',
          subMenuName: 'checkMerchant'
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
      title: '支付宝直连审核',
      icon: 'aliDirectList',
      subMenuName: 'checkMerchant'
    },
    children: [
      {
        path: 'detail',
        name: 'aliDirectListDetail',
        meta: {
          fatherName: 'aliDirectList',
          title: '支付宝直连审核详情',
          icon: 'aliDirectListDetail',
          subMenuName: 'checkMerchant'
        },
        component: () => import('@/page/approval/merchantCheck/aliDirectListDetail.vue')
      },
      {
        path: 'recordDetail',
        name: 'aliDirectRecordDetail',
        meta: {
          fatherName: 'aliDirectList',
          title: '支付宝直连审核记录',
          icon: 'aliDirectRecordDetail',
          subMenuName: 'checkMerchant'
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
      title: '微信直连审核',
      icon: 'wxDirectList',
      subMenuName: 'checkMerchant'
    },
    children: [
      {
        path: 'detail',
        name: 'wxDirectListDetail',
        meta: {
          fatherName: 'wxDirectList',
          title: '微信直连审核详情',
          icon: 'wxDirectListDetail',
          subMenuName: 'checkMerchant'
        },
        component: () => import('@/page/approval/merchantCheck/wxDirectListDetail.vue')
      },
      {
        path: 'recordDetail',
        name: 'wxDirectRecordDetail',
        meta: {
          fatherName: 'wxDirectList',
          title: '微信直连审核记录',
          icon: 'wxDirectRecordDetail',
          subMenuName: 'checkMerchant'
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
      title: '下级服务商审核',
      icon: 'checkService'
    },
    children: []
  },
  'checkServiceList': {
    path: 'checkServiceList',
    name: 'checkServiceList',
    component: () => import('@/page/approval/serviceCheck/checkServiceList.vue'),
    meta: {
      title: '下级服务商审核',
      icon: 'checkServiceList',
      subMenuName: 'checkService'
    },
    children: [
      {
        path: 'detail',
        name: 'checkServiceListDetail',
        meta: {
          fatherName: 'checkServiceList',
          title: '下级服务商审核详情',
          icon: 'checkServiceListDetail',
          subMenuName: 'checkService'
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
      title: '合伙人审核',
      icon: 'checkPartner'
    },
    children: []
  },
  'checkPartnerList': {
    path: 'checkPartnerList',
    name: 'checkPartnerList',
    component: () => import('@/page/approval/partnerCheck/checkPartnerList.vue'),
    meta: {
      title: '合伙人审核列表',
      icon: 'checkPartnerList',
      subMenuName: 'checkPartner'
    },
    children: [
      {
        path: 'detail',
        name: 'checkPartnerListDetail',
        meta: {
          fatherName: 'checkPartnerList',
          title: '合伙人审核详情',
          icon: 'checkPartnerListDetail',
          subMenuName: 'checkPartner'
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
      title: '系统配置',
      icon: 'systemConfig'
    },
    children: []
  },
  'userList': {
    path: 'userList',
    name: 'userList',
    component: () => import('@/page/systemConfig/userList.vue'),
    meta: {
      title: '成员列表',
      icon: 'userList'
    },
    children: []
  },
  'userManager': {
    path: 'userManager',
    name: 'userManager',
    component: () => import('@/page/systemConfig/userManager.vue'),
    meta: {
      title: '成员管理',
      icon: 'userManager'
    },
    children: []
  },
  'menuManage': {
    path: 'menuManage',
    name: 'menuManage',
    component: () => import('@/page/systemConfig/menuManage/menuManage.vue'),
    meta: {
      title: '菜单管理',
      icon: 'menuManage'
    },
    children: []
  },
  'operationMenu': {
    path: 'operationMenu',
    name: 'operationMenu',
    component: () => import('@/page/systemConfig/menuManage/operationMenu.vue'),
    meta: {
      title: '运营后台菜单',
      subMenuName: 'menuManage',
      icon: 'operationMenu'
    },
    children: []
  },
  'agentMenu': {
    path: 'agentMenu',
    name: 'agentMenu',
    component: () => import('@/page/systemConfig/menuManage/agentMenu.vue'),
    meta: {
      title: '服务商后台菜单',
      subMenuName: 'menuManage',
      icon: 'agentMenu'
    },
    children: []
  },
  'businessMenu': {
    path: 'businessMenu',
    name: 'businessMenu',
    component: () => import('@/page/systemConfig/menuManage/businessMenu.vue'),
    meta: {
      title: '商应小程序菜单',
      subMenuName: 'menuManage',
      icon: 'businessMenu'
    },
    children: []
  },
  'approvalManager': {
    path: 'approvalManager',
    name: 'approvalManager',
    component: () => import('@/page/systemConfig/approvalManager.vue'),
    meta: {
      title: '审批管理',
      icon: 'approvalManager'
    },
    children: []
  },
  'customForm': {
    path: 'customForm',
    name: 'customForm',
    component: () => import('@/page/systemConfig/customForm.vue'),
    meta: {
      title: '自定义表单',
      icon: 'customForm'
    },
    children: []
  },
  'paramSetting': {
    path: 'paramSetting',
    name: 'paramSetting',
    component: () => import('@/page/systemConfig/paramSetting.vue'),
    meta: {
      title: '参数设置',
      icon: 'paramSetting'
    },
    children: []
  },
  'powerManager': {
    path: 'powerManager',
    name: 'powerManager',
    component: () => import('@/page/systemConfig/powerManager.vue'),
    meta: {
      title: '权限管理',
      icon: 'powerManager'
    },
    children: [
      {
        path: 'powerBtnManager',
        name: 'powerBtnManager',
        component: () => import('@/page/systemConfig/powerBtnManager.vue'),
        meta: {
          fatherName: 'powerManager',
          title: '编辑按钮',
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
      title: '服务商产品权限',
      icon: 'agentPowerManager'
    },
    children: []
  },
  'agentPcManager': {
    path: 'agentPcManager',
    name: 'agentPcManager',
    component: () => import('@/page/systemConfig/agentPowerManager/agentPcManager.vue'),
    meta: {
      title: '后台角色权限',
      icon: 'agentPcManager',
      subMenuName: 'agentPowerManager'
    },
    children: []
  },
  'agentAppletManager': {
    path: 'agentAppletManager',
    name: 'agentAppletManager',
    component: () => import('@/page/systemConfig/agentPowerManager/agentAppletManager.vue'),
    meta: {
      title: '小程序角色权限',
      icon: 'agentAppletManager',
      subMenuName: 'agentPowerManager'
    },
    children: []
  },
  'risk': {
    path: '/risk',
    name: 'risk',
    component: Layout,
    meta: {
      title: '风控管理',
      icon: 'risk'
    },
    children: []
  },
  'incomingRisk': {
    path: 'incomingRisk',
    name: 'incomingRisk',
    component: () => import('@/page/risk/incomingRisk/incomingRisk.vue'),
    meta: {
      title: '入件风控',
      icon: 'incomingRisk'
    },
    children: []
  },
  'serviceIncomingRisk': {
    path: 'serviceIncomingRisk',
    name: 'serviceIncomingRisk',
    component: () => import('@/page/risk/incomingRisk/serviceIncomingRisk.vue'),
    meta: {
      title: '服务商入件风控',
      icon: 'serviceIncomingRisk',
      subMenuName: 'incomingRisk'
    },
    children: []
  },
  'merchantDataIncomingRisk': {
    path: 'merchantDataIncomingRisk',
    name: 'merchantDataIncomingRisk',
    component: () => import('@/page/risk/incomingRisk/merchantDataIncomingRisk.vue'),
    meta: {
      title: '商户入件资料风控',
      icon: 'merchantDataIncomingRisk',
      subMenuName: 'incomingRisk'
    },
    children: [
      {
        path: 'detail',
        name: 'blackListDetail',
        meta: {
          fatherName: 'merchantDataIncomingRisk',
          title: '黑名单列表',
          icon: 'blackListDetail'
        },
        component: () => import('@/page/risk/incomingRisk/blackListDetail.vue')
      }
    ]
  },
  'riskAppeal': {
    path: 'riskAppeal',
    name: 'riskAppeal',
    component: () => import('@/page/risk/riskAppeal/riskAppeal.vue'),
    meta: {
      title: '风控申诉管理',
      icon: 'riskAppeal'
    },
    children: []
  },
  'leRiskList': {
    path: 'leRiskList',
    name: 'leRiskList',
    component: () => import('@/page/risk/riskAppeal/leRiskList.vue'),
    meta: {
      title: '乐刷风控',
      icon: 'leRiskList',
      subMenuName: 'riskAppeal'
    },
    children: [
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/page/risk/riskAppeal/leRiskListDetail.vue'),
        meta: {
          fatherName: 'leRiskList',
          title: '详情',
          icon: 'detail'
        }
      }
    ]
  },
  'merchantRiskList': {
    path: 'merchantRiskList',
    name: 'merchantRiskList',
    component: () => import('@/page/risk/riskAppeal/merchantRiskList.vue'),
    meta: {
      title: '平台商户资料风控',
      icon: 'merchantRiskList',
      subMenuName: 'riskAppeal'
    },
    children: [
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/page/risk/riskAppeal/merchantRiskListDetail.vue'),
        meta: {
          fatherName: 'merchantRiskList',
          title: '详情',
          icon: 'detail'
        }
      }
    ]
  },
  'transferReview': {
    path: '/transferReview',
    name: 'transferReview',
    component: Layout,
    meta: {
      title: '对公转账审核',
      icon: 'transferReview'
    },
    children: []
  },
  'operationApprove': {
    path: 'operationApprove',
    name: 'operationApprove',
    meta: {
      title: '运营结算审核',
      icon: 'operationApprove'
    },
    component: () => import('@/page/transferReview/operationApprove.vue'),
    children: [
    ]
  },
  'financialAudit': {
    path: 'financialAudit',
    name: 'financialAudit',
    component: () => import('@/page/transferReview/financialAudit/financialAudit.vue'),
    meta: {
      title: '财务审核',
      icon: 'financialAudit'
    },
    children: []
  },
  "financialSettlement": {
    path: 'financialSettlement',
    name: 'financialSettlement',
    component: () => import('@/page/transferReview/financialAudit/financialSettlement.vue'),
    meta: {
      title: '财务结算审核',
      icon: 'financialSettlement',
      subMenuName: 'financialAudit'
    },
    children: [
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/page/transferReview/financialAudit/financialSettlementDetail.vue'),
        meta: {
          fatherName: 'financialSettlement',
          title: '详情',
          icon: 'detail'
        }
      }]
  },
  "financialOrder": {
    path: 'financialOrder',
    name: 'financialOrder',
    component: () => import('@/page/transferReview/financialAudit/financialOrder.vue'),
    meta: {
      title: '财务订购审核',
      icon: 'financialOrder',
      subMenuName: 'financialAudit'
    },
    children: []
  },
  "financialRenewal": {
    path: 'financialRenewal',
    name: 'financialRenewal',
    component: () => import('@/page/transferReview/financialAudit/financialRenewal.vue'),
    meta: {
      title: '财务续费审核',
      icon: 'financialRenewal',
      subMenuName: 'financialAudit'
    },
    children: []
  }
}
const routers = []
const menusToRoutes = function (data) {
  const result = []
  data.forEach(item => {
    const curr = asyncRoutes[item.name];
    if (item.children) {
      item.children.forEach(item2 => {
        generateRoutes(curr.children, item2)
      })
    }
    result.push(curr)
  })
  result.push({ path: '*', redirect: '/error' })
  console.log(result);
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
      console.log(children)
      generateRoutes(asyncRoutes[item.name].children, e)
    })
  }
}

export default {
  menusToRoutes: menusToRoutes,
  getRouters: getRouters
}

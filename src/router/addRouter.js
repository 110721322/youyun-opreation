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

  'orderManage': {
    path: 'orderManage',
    name: 'orderManage',
    component: () => import('@/page/agent/orderManage/orderManage.vue'),
    meta: {
      title: 'orderManage',
      icon: 'orderManage'
    },
    children: []
  },
  'hardwareOrder': {
    path: 'hardwareOrder',
    name: 'hardwareOrder',
    meta: {
      title: 'hardwareOrder',
      icon: 'hardwareOrder'
    },
    component: () => import('@/page/agent/orderManage/hardwareOrder.vue'),
    children: [{
      path: 'detail',
      name: 'detail',
      meta: {
        title: 'detail',
        icon: 'detail'
      },
      component: () => import('@/page/agent/orderManage/hardwareOrderDetail.vue')
    }]
  },
  'adManage': {
    path: 'adManage',
    name: 'adManage',
    component: () => import('@/page/agent/adManage/adManage.vue'),
    meta: {
      title: 'adManage',
      icon: 'adManage'
    },
    children: []
  },
  'adAuth': {
    path: 'adAuth',
    name: 'adAuth',
    meta: {
      title: 'adAuth',
      icon: 'adAuth'
    },
    component: () => import('@/page/agent/adManage/adAuth.vue'),
    children: []
  },
  'adPutList': {
    path: 'adPutList',
    name: 'adPutList',
    meta: {
      title: 'adPutList',
      icon: 'adPutList'
    },
    component: () => import('@/page/agent/adManage/adPutList.vue'),
    children: [
      {
        path: 'detail',
        name: 'adPutDetail',
        meta: {
          fatherName: 'adPutList',
          title: 'adPutDetail',
          icon: 'adPutDetail'
        },
        component: () => import('@/page/agent/adManage/adPutDetail.vue')
      }
    ]
  },
  'platformAdList': {
    path: 'platformAdList',
    name: 'platformAdList',
    meta: {
      title: 'platformAdList',
      icon: 'platformAdList'
    },
    component: () => import('@/page/agent/adManage/platformAdList.vue'),
    children: [
      {
        path: 'detail',
        name: 'platformAdDetail',
        meta: {
          fatherName: 'platformAdList',
          title: 'platformAdDetail',
          icon: 'platformAdDetail'
        },
        component: () => import('@/page/agent/adManage/platformAdDetail.vue')
      }
    ]
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
          title: 'repairDetail',
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
  'menuManager': {
    path: 'menuManager',
    name: 'menuManager',
    component: () => import('@/page/systemConfig/menuManager.vue'),
    meta: {
      title: '菜单管理',
      icon: 'menuManager'
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
      title: 'risk',
      icon: 'risk'
    },
    children: []
  },
  'incomingRisk': {
    path: 'incomingRisk',
    name: 'incomingRisk',
    component: () => import('@/page/risk/incomingRisk/incomingRisk.vue'),
    meta: {
      title: 'incomingRisk',
      icon: 'incomingRisk'
    },
    children: []
  },
  'serviceIncomingRisk': {
    path: 'serviceIncomingRisk',
    name: 'serviceIncomingRisk',
    component: () => import('@/page/risk/incomingRisk/serviceIncomingRisk.vue'),
    meta: {
      title: 'serviceIncomingRisk',
      icon: 'serviceIncomingRisk'
    },
    children: []
  },
  'merchantDataIncomingRisk': {
    path: 'merchantDataIncomingRisk',
    name: 'merchantDataIncomingRisk',
    component: () => import('@/page/risk/incomingRisk/merchantDataIncomingRisk.vue'),
    meta: {
      title: 'merchantDataIncomingRisk',
      icon: 'merchantDataIncomingRisk'
    },
    children: [
      {
        path: 'detail',
        name: 'blackListDetail',
        meta: {
          fatherName: 'merchantDataIncomingRisk',
          title: 'blackListDetail',
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
      title: 'riskAppeal',
      icon: 'riskAppeal'
    },
    children: []
  },
  'leRiskList': {
    path: 'leRiskList',
    name: 'leRiskList',
    component: () => import('@/page/risk/riskAppeal/leRiskList.vue'),
    meta: {
      title: 'leRiskList',
      icon: 'leRiskList'
    },
    children: [
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/page/risk/riskAppeal/leRiskListDetail.vue'),
        meta: {
          fatherName: 'leRiskList',
          title: 'detail',
          icon: 'detail'
        }
      }
    ]
  },
  "merchantRiskList": {
    path: 'merchantRiskList',
    name: 'merchantRiskList',
    component: () => import('@/page/risk/riskAppeal/merchantRiskList.vue'),
    meta: {
      title: 'merchantRiskList',
      icon: 'merchantRiskList'
    },
    children: [
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/page/risk/riskAppeal/merchantRiskListDetail.vue'),
        meta: {
          fatherName: 'merchantRiskList',
          title: 'detail',
          icon: 'detail'
        }
      }
    ]
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

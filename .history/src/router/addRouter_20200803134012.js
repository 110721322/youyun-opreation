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
  topAgent: {
    path: '/topAgent',
    name: 'topAgent',
    component: Layout,
    meta: {
      title: '顶级服务商管理',
      icon: 'agent'
    },
    children: []
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
  'topDataMarket': {
    path: 'topDataMarket',
    name: 'topDataMarket',
    meta: {
      title: '数据大盘',
      icon: 'topDataMarket'
    },
    component: () => import('@/page/topAgent/topDataMarket.vue'),
    children: [
      {
        path: 'detail',
        name: 'topAgentData',
        meta: {
          fatherName: 'topDataMarket',
          title: '详情',
          icon: 'topAgentData',
          refreshDom: true
        },
        component: () => import('@/page/topAgent/topAmountDetail.vue')
      }
    ]
  },
  'topAgentList': {
    path: 'topAgentList',
    name: 'topAgentList',
    meta: {
      title: '服务商列表',
      icon: 'topAgentList'
    },
    component: () => import('@/page/topAgent/topAgentList.vue'),
    children: [
      {
        path: 'addTopAgent',
        name: 'addTopAgent',
        meta: {
          title: '添加服务商',
          icon: 'addTopAgent',
          fatherName: 'topAgentList'
        },
        component: () => import('@/page/topAgent/addTopAgent.vue')
      },
      {
        path: 'topAgentDetail',
        name: 'topAgentDetail',
        meta: {
          title: '服务商详情',
          icon: 'topAgentDetail',
          fatherName: 'topAgentList'
        },
        component: () => import('@/page/topAgent/topAgentDetail.vue')
      }
    ]
  },
  'examineList': {
    path: 'examineList',
    name: 'examineList',
    meta: {
      title: '服务商审核列表',
      icon: 'examineList'
    },
    component: () => import('@/page/topAgent/examineList.vue')
  },
  'agentDeploy': {
    path: 'agentDeploy',
    name: 'agentDeploy',
    meta: {
      title: '服务器部署',
      icon: 'agentDeploy'
    },
    component: () => import('@/page/topAgent/agentDeploy.vue'),
    children: [
      {
        path: 'deployDetail',
        name: 'deployDetail',
        meta: {
          title: '部署详情',
          icon: 'deployDetail',
          fatherName: 'agentDeploy'
        },
        component: () => import('@/page/topAgent/deployDetail.vue')
      }
    ]
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
      },
      {
        path: 'addAgent',
        name: 'addAgent',
        meta: {
          fatherName: 'agentList',
          title: '添加服务商',
          icon: 'addAgent'
        },
        component: () => import('@/page/agent/addAgent.vue')
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
  marketing: {
    path: '/marketing',
    name: 'marketing',
    component: Layout,
    meta: {
      title: '服务商管理',
      icon: 'agent'
    },
    children: []
  },
  financial: {
    path: '/financial',
    name: 'financial',
    meta: {
      title: '财务中心',
      icon: 'financial'
    },
    component: Layout,
    children: []
  },
  'shareProfit': {
    path: 'shareProfit',
    name: 'shareProfit',
    meta: {
      title: '分润统计表',
      subMenuName: '',
      icon: 'shareProfit'
    },
    component: () => import('@/page/financial/shareProfit/serviceProfit.vue'),
    children: []
  },
  'activityAward': {
    path: 'activityAward',
    name: 'activityAward',
    meta: {
      title: '活动奖励',
      subMenuName: '',
      icon: 'activityAward'
    },
    component: () => import('@/page/financial/activityAward/aplyAward.vue'),
    children: [
      {
        path: 'activityAwardDetail',
        name: 'activityAwardDetail',
        meta: {
          title: '活动奖励',
          fatherName: 'activityAward',
          icon: 'activityAwardDetail'
        },
        component: () => import('@/page/financial/activityAward/activityAwardDetail.vue')
      }
    ]
  },
  'aplyAward': {
    path: 'aplyAward',
    name: 'aplyAward',
    meta: {
      title: '活动奖励',
      subMenuName: '',
      icon: 'activityAward'
    },
    component: () => import('@/page/financial/activityAward/aplyAward.vue'),
    children: []
  },
  'transferReview': {
    path: 'transferReview',
    name: 'transferReview',
    meta: {
      title: '财务审核',
      subMenuName: '',
      icon: 'transferReview'
    },
    component: () => import('@/page/financial/transferReview/commission.vue'),
    children: []
  },
  'comSettlement': {
    path: '/comSettlement',
    name: 'comSettlement',
    meta: {
      title: '佣金结算',
      icon: 'comSettlement'
    },
    component: Layout,
    children: []
  },
  'comset': {
    path: 'comset',
    name: 'comset',
    meta: {
      title: '佣金结算',
      icon: 'comset'
    },
    component: () => import('@/page/comSettlement/comset.vue'),
    children: [
      {
        path: 'comsetDetail',
        name: 'comsetDetail',
        meta: {
          title: '佣金明细',
          fatherName: 'comset',
          icon: 'comsetDetail'
        },
        component: () => import('@/page/comSettlement/comsetDetail.vue')
      }
    ]
  },
  'operation': {
    path: 'operation',
    name: 'operation',
    meta: {
      title: '运营审核',
      subMenuName: '',
      icon: 'operation'
    },
    component: () => import('@/page/financial/operation/operationApprove.vue'),
    children: []
  },
  'operationApprove': {
    path: 'operationApprove',
    name: 'operationApprove',
    meta: {
      title: '佣金结算审核',
      subMenuName: '',
      icon: 'operationApprove'
    },
    component: () => import('@/page/financial/operation/operationApprove.vue'),
    children: []
  },
  'directProfits': {
    path: 'directProfits',
    name: 'directProfits',
    meta: {
      title: '直连分润导入',
      subMenuName: '',
      icon: 'directProfits'
    },
    component: () => import('@/layout/components/viewer.vue'),
    children: []
  },
  'aliProfits': {
    path: 'aliProfits',
    name: 'aliProfits',
    meta: {
      title: '支付宝直连导入',
      subMenuName: '',
      icon: 'aliProfits'
    },
    component: () => import('@/page/financial/directProfits/aliProfits.vue'),
    children: []
  },
  'wxProfits': {
    path: 'wxProfits',
    name: 'wxProfits',
    meta: {
      title: '微信直连导入',
      subMenuName: '',
      icon: 'wxProfits'
    },
    component: () => import('@/page/financial/directProfits/wxProfits.vue'),
    children: []
  },
  'profitsDetail': {
    path: 'profitsDetail',
    name: 'profitsDetail',
    meta: {
      title: '商户明细',
      subMenuName: '',
      icon: 'profitsDetail'
    },
    component: () => import('@/page/financial/directProfits/profitsDetail.vue'),
    children: []
  },
  'coupon': {
    path: 'coupon',
    name: 'coupon',
    meta: {
      title: '优惠券',
      subMenuName: '',
      icon: 'coupon'
    },
    component: () => import('@/page/marketing/coupon.vue'),
    children: [
      {
        path: 'addCoupon',
        name: 'addCoupon',
        meta: {
          fatherName: 'coupon',
          title: '添加优惠券',
          icon: 'addCoupon'
        },
        component: () => import('@/page/marketing/addCoupon.vue')
      },
      {
        path: 'couponDetail',
        name: 'couponDetail',
        meta: {
          fatherName: 'coupon',
          title: '优惠券详情',
          icon: 'couponDetail'
        },
        component: () => import('@/page/marketing/couponDetail.vue')
      }
    ]
  },
  'serviceProfit': {
    path: 'serviceProfit',
    name: 'serviceProfit',
    meta: {
      title: '服务商分润统计',
      subMenuName: 'shareProfit',
      icon: 'serviceProfit'
    },
    component: () => import('@/page/financial/shareProfit/serviceProfit.vue'),
    children: [
      {
        path: 'serviceProfitDetail',
        name: 'serviceProfitDetail',
        meta: {
          fatherName: 'serviceProfit',
          icon: 'serviceProfitDetail',
          title: '商户明细'
        },
        component: () => import('@/page/financial/shareProfit/serviceProfitDetail.vue')
      }
    ]
  },
  'interconnection': {
    path: 'interconnection',
    name: 'interconnection',
    meta: {
      title: '间联分润统计',
      subMenuName: 'shareProfit',
      icon: 'interconnection'
    },
    component: () => import('@/page/financial/shareProfit/interconnection.vue'),
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
  'renewalDue': {
    path: 'renewalDue',
    name: 'renewalDue',
    meta: {
      title: '到期续费记录',
      icon: 'renewalDue'
    },
    component: () => import('@/page/agent/renewalDue.vue')
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
  'serveMarket': {
    path: '/serveMarket',
    name: 'serveMarket',
    component: Layout,
    meta: {
      title: '服务市场',
      icon: 'serveMarket'
    },
    children: []
  },
  'businessModel': {
    path: 'businessModel',
    name: 'businessModel',
    meta: {
      title: '业务模式',
      icon: 'businessModel'
    },
    component: () => import('@/page/serveMarket/businessModel.vue'),
    children: [
      {
        path: 'detail',
        name: 'detail',
        meta: {
          title: '小马哥代理',
          icon: 'xmgAgent',
          fatherName: 'businessModel'
        },
        component: () => import('@/page/serveMarket/xmgAgent.vue')
      },
      {
        path: 'omedetail',
        name: 'omedetail',
        meta: {
          title: 'OEM贴牌',
          icon: 'omeAgent',
          fatherName: 'businessModel'
        },
        component: () => import('@/page/serveMarket/omeAgent.vue')
      },
      {
        path: 'newdetail',
        name: 'newdetail',
        meta: {
          title: '新源码',
          icon: 'newAgent',
          fatherName: 'businessModel'
        },
        component: () => import('@/page/serveMarket/newAgent.vue')
      },
      {
        path: 'subOrder',
        name: 'subOrder',
        meta: {
          title: '下单页面',
          icon: 'newAgent',
          fatherName: 'businessModel'
        },
        component: () => import('@/page/serveMarket/subOrder.vue')
      },
      {
        path: 'payAmount',
        name: 'payAmount',
        meta: {
          title: '下单页面',
          icon: 'newAgent',
          fatherName: 'businessModel'
        },
        component: () => import('@/page/serveMarket/payAmount.vue')
      },
      {
        path: 'payStatus',
        name: 'payStatus',
        meta: {
          title: '下单页面',
          icon: 'newAgent',
          fatherName: 'businessModel'
        },
        component: () => import('@/page/serveMarket/payStatus.vue')
      }
    ]
  },
  'tradingChannel': {
    path: 'tradingChannel',
    name: 'tradingChannel',
    meta: {
      title: '交易通道',
      icon: 'tradingChannel'
    },
    component: () => import('@/page/serveMarket/tradingChannel.vue'),
    children: [
      {
        path: 'lsBuyIndex',
        name: 'lsBuyIndex',
        meta: {
          title: '乐刷通道',
          icon: 'lsBuyIndex',
          fatherName: 'tradingChannel'
        },
        component: () => import('@/page/serveMarket/lsBuyIndex.vue')
      }
    ]
  },
  'brandCustomization': {
    path: 'brandCustomization',
    name: 'brandCustomization',
    meta: {
      title: '品牌定制',
      icon: 'brandCustomization'
    },
    component: () => import('@/page/serveMarket/brandCustomization.vue'),
    children: [
      {
        path: 'domainCustomer',
        name: 'domainCustomer',
        meta: {
          title: '域名定制',
          icon: 'domainCustomer',
          fatherName: 'brandCustomization'
        },
        component: () => import('@/page/serveMarket/domainCustomer.vue')
      }
    ]
  },
  'applicationCenter': {
    path: 'applicationCenter',
    name: 'applicationCenter',
    meta: {
      title: '应用中心',
      icon: 'applicationCenter'
    },
    component: () => import('@/page/serveMarket/applicationCenter.vue'),
    children: [
      {
        path: 'messageCustomer',
        name: 'messageCustomer',
        meta: {
          title: '短信充值',
          icon: 'messageCustomer',
          fatherName: 'applicationCenter'
        },
        component: () => import('@/page/serveMarket/messageCustomer.vue')
      }
    ]
  },
  'equipmentMall': {
    path: 'equipmentMall',
    name: 'equipmentMall',
    meta: {
      title: '设备商城',
      icon: 'equipmentMall'
    },
    component: () => import('@/page/serveMarket/equipmentMall.vue'),
    children: [
      {
        path: 'equimentDetail',
        name: 'equimentDetail',
        meta: {
          title: '设备详情',
          icon: 'equimentDetail',
          fatherName: 'equipmentMall'
        },
        component: () => import('@/page/serveMarket/equimentDetail.vue')
      },
      {
        path: 'shoppingCart',
        name: 'shoppingCart',
        meta: {
          title: '购物车',
          icon: 'shoppingCart',
          fatherName: 'equipmentMall'
        },
        component: () => import('@/page/serveMarket/shoppingCart.vue')
      },
      {
        path: 'equimentOrder',
        name: 'equimentOrder',
        meta: {
          title: '下单',
          icon: 'equimentOrder',
          fatherName: 'equipmentMall'
        },
        component: () => import('@/page/serveMarket/equimentOrder.vue')
      },
      {
        path: 'equimentPay',
        name: 'equimentPay',
        meta: {
          title: '支付',
          icon: 'equimentPay',
          fatherName: 'equipmentMall'
        },
        component: () => import('@/page/serveMarket/equimentPay.vue')
      },
      {
        path: 'orderRecords',
        name: 'orderRecords',
        meta: {
          title: '订单记录',
          icon: 'orderRecords',
          fatherName: 'equipmentMall'
        },
        component: () => import('@/page/serveMarket/orderRecords.vue')
      },
      {
        path: 'equimentOrderDetail',
        name: 'equimentOrderDetail',
        meta: {
          title: '订单详情',
          icon: 'equimentOrderDetail',
          fatherName: 'equipmentMall'
        },
        component: () => import('@/page/serveMarket/equimentOrderDetail.vue')
      }
    ]

  },
  'purchasedItems': {
    path: 'purchasedItems',
    name: 'purchasedItems',
    meta: {
      title: '已购项目',
      icon: 'purchasedItems'
    },
    component: () => import('@/page/serveMarket/purchasedItems.vue')
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
  'publicTransfer': {
    path: 'publicTransfer',
    name: 'publicTransfer',
    meta: {
      title: '对公转账审核',
      icon: 'publicTransfer'
    },
    component: () => import('@/page/financial/transferReview/publicTransfer.vue')
  },
  'commission': {
    path: 'commission',
    name: 'commission',
    meta: {
      title: '佣金结算审核',
      icon: 'commission'
    },
    component: () => import('@/page/financial/transferReview/commission.vue'),
    children: [
      {
        path: 'commissionDetail',
        name: 'commissionDetail',
        meta: {
          title: '佣金结算审核详情',
          icon: 'commissionDetail'
        },
        component: () => import('@/page/financial/transferReview/commissionDetail.vue')
      }
    ]
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
          title: '详情',
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
          title: '详情',
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
    component: () => import('@/page/approval/serviceCheck/checkService.vue'),
    meta: {
      title: '下级服务商审核',
      icon: 'checkService'
    },
    children: [
      {
        path: 'detail',
        name: 'checkServiceListDetail',
        meta: {
          fatherName: 'checkService',
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
    component: () => import('@/page/approval/partnerCheck/checkPartnerList.vue'),
    meta: {
      title: '合伙人审核列表',
      icon: 'checkPartner'
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
  }
}
const routers = []
const menusToRoutes = function (data) {
  const result = []
  data.forEach(item => {
    const curr = asyncRoutes[item.name];
    if (curr) {
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
      children.push(page)
    } else {
      console.error(`not find page ${item.name} , page's title is ${item.meta.title}`);
    }
  }

  if (item.children) {
    item.children.forEach(e => {
      // console.log(children)
      generateRoutes(asyncRoutes[item.name].children, e)
    })
  }
}

export default {
  menusToRoutes: menusToRoutes,
  getRouters: getRouters
}

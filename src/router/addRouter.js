import Layout from '@/layout/index.vue'
import utils from "@/libs/kit/utils"
const asyncRoutes = {
  'work': {
    path: '/workBench',
    name: "workBench",
    component: Layout,
    meta: {
      title: '工作台',
      icon: 'icongongzuotai'
    },
    children: [
      {
        path: '/work',
        name: 'work',
        meta: {
          title: '工作台',
          icon: 'icongongzuotai'
        },
        component: () => import('@/page/work/workBench.vue')
      },
      {
        path: '/workBench/workTodo',
        name: 'workTodo',
        meta: {
          title: '待办事项',
          icon: 'workTodo'
        },
        component: () => import('@/page/work/workTodo.vue')
      },
      {
        path: '/workBench/approvalDetail',
        name: 'approvalDetail',
        meta: {
          title: '审批任务详情',
          icon: 'approvalDetail'
        },
        component: () => import('@/page/work/approvalDetail.vue')
      }
    ]
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
    path: '/merchant/merchantList',
    name: 'merchantList',
    meta: {
      title: '商户列表',
      icon: 'merchantList',
      keepAlive: "MerchantList"
    },
    component: () => import('@/page/merchant/merchantList.vue'),
    children: [
      {
        path: '/merchant/merchantList/merchantDetail',
        name: 'merchantDetail',
        meta: {
          title: '商户详情',
          icon: 'merchantDetail',
          fatherName: 'merchantList',
          parentName: 'merchant'
        },
        component: () => import('@/page/merchant/merchantDetail.vue')
      }
    ]
  },
  'merchantSetRecord': {
    path: '/merchant/merchantSetRecord',
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
    path: '/agent/agentList',
    name: 'agentList',
    meta: {
      title: '服务商列表',
      icon: 'agentList',
      keepAlive: "AgentList"
    },
    component: () => import('@/page/agent/agentList.vue'),
    children: [
      {
        path: '/agent/agentList/agentDetail',
        name: 'agentDetail',
        meta: {
          fatherName: 'agentList',
          parentName: 'agent',
          title: '服务商详情',
          icon: 'agentDetail'
        },
        component: () => import('@/page/agent/agentDetail.vue')
      },
      {
        path: '/agent/agentList/addAgent',
        name: 'addAgent',
        meta: {
          fatherName: 'agentList',
          parentName: 'agent',
          title: '添加服务商',
          icon: 'addAgent'
        },
        component: () => import('@/page/agent/addAgent.vue')
      }
    ]
  },
  'agentSubList': {
    path: 'agentSubList',
    name: 'agentSubList',
    meta: {
      title: '下级服务商列表',
      icon: 'agentSubList',
      keepAlive: "AgentSubList"
    },
    component: () => import('@/page/agent/agentSubList.vue'),
    children: [
      {
        path: '/agent/agentSubList/agentSubListDetail',
        name: 'agentSubListDetail',
        meta: {
          fatherName: 'agentSubList',
          parentName: 'agent',
          title: '下级服务商详情',
          icon: 'agentSubListDetail'
        },
        component: () => import('@/page/agent/agentSubDetail.vue')
      }
    ]
  },
  'agentCheckList': {
    path: '/agent/agentCheckList',
    name: 'agentCheckList',
    meta: {
      title: '服务商审核列表',
      icon: 'agentCheckList'
    },
    component: () => import('@/page/agent/agentCheckList.vue')
  },
  'dividedOverview': {
    path: '/agent/dividedOverview',
    name: 'dividedOverview',
    meta: {
      title: '分润总览',
      icon: 'dividedOverview',
      keepAlive: 'DividedOverview'
    },
    component: () => import('@/page/agent/dividedOverview.vue'),
    children: [
      {
        name: '/agent/dividedOverview/dividedOverviewDetail',
        path: 'dividedOverviewDetail',
        component: () => import('@/page/agent/dividedOverviewDetail.vue'),
        meta: {
          title: '商户分润明细',
          icon: 'dividedOverviewDetail',
          fatherName: 'dividedOverview',
          parentName: 'agent'
        }
      }
    ]
  },
  'renewalDue': {
    path: '/agent/renewalDue',
    name: 'renewalDue',
    meta: {
      title: '到期续费记录',
      icon: 'renewalDue'
    },
    component: () => import('@/page/agent/renewalDue.vue')
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
    path: '/financial/shareProfit',
    name: 'shareProfit',
    meta: {
      title: '分润统计表',
      subMenuName: '',
      icon: 'shareProfit'
    },
    component: () => import('@/page/financial/shareProfit/serviceProfit.vue'),
    children: []
  },
  'serviceProfit': {
    path: '/financial/shareProfit/serviceProfit',
    name: 'serviceProfit',
    meta: {
      title: '服务商分润统计',
      subMenuName: 'shareProfit',
      icon: 'serviceProfit',
      keepAlive: 'ServiceProfit'
    },
    component: () => import('@/page/financial/shareProfit/serviceProfit.vue'),
    children: [
      {
        path: '/financial/shareProfit/serviceProfit/serviceProfitDetail',
        name: 'serviceProfitDetail',
        meta: {
          fatherName: 'serviceProfit',
          parentName: 'financial',
          icon: 'serviceProfitDetail',
          title: '商户明细'
        },
        component: () => import('@/page/financial/shareProfit/serviceProfitDetail.vue')
      }
    ]
  },
  'interconnection': {
    path: '/financial/shareProfit/interconnection',
    name: 'interconnection',
    meta: {
      title: '间联分润统计',
      subMenuName: 'shareProfit',
      icon: 'interconnection'
    },
    component: () => import('@/page/financial/shareProfit/interconnection.vue'),
    children: []
  },
  'activityAward': {
    path: '/financial/activityAward',
    name: 'activityAward',
    meta: {
      title: '活动奖励',
      icon: 'activityAward'
    },
    component: () => import('@/page/financial/activityAward/aplyAward.vue'),
    children: []
  },
  'aplyAward': {
    path: '/financial/activityAward/aplyAward',
    name: 'aplyAward',
    meta: {
      title: '支付宝活动奖励',
      subMenuName: 'activityAward',
      icon: 'activityAward',
      keepAlive: "AplyAward"
    },
    component: () => import('@/page/financial/activityAward/aplyAward.vue'),
    children: [
      {
        path: '/financial/activityAward/aplyAward/activityAwardDetail',
        name: 'activityAwardDetail',
        meta: {
          title: '奖励明细',
          fatherName: 'aplyAward',
          subMenuName: 'activityAward',
          parentName: 'financial',
          icon: 'activityAwardDetail'
        },
        component: () => import('@/page/financial/activityAward/activityAwardDetail.vue')
      }
    ]
  },
  'transferReview': {
    path: '/financial/transferReview',
    name: 'transferReview',
    meta: {
      title: '财务审核',
      icon: 'transferReview'
    },
    component: () => import('@/page/financial/transferReview/commission.vue'),
    children: []
  },
  'commission': {
    path: '/financial/transferReview/commission',
    name: 'commission',
    meta: {
      title: '佣金结算审核',
      subMenuName: 'transferReview',
      icon: 'commission'
    },
    component: () => import('@/page/financial/transferReview/commission.vue'),
    children: []
  },
  'publicTransfer': {
    path: '/financial/transferReview/publicTransfer',
    name: 'publicTransfer',
    meta: {
      title: '对公转账审核',
      icon: 'publicTransfer',
      subMenuName: 'transferReview'
    },
    component: () => import('@/page/financial/transferReview/publicTransfer.vue')
  },
  'operation': {
    path: '/financial/operation',
    name: 'operation',
    meta: {
      title: '运营审核',
      icon: 'operation'
    },
    component: () => import('@/page/financial/operation/operationApprove.vue'),
    children: []
  },
  'operationApprove': {
    path: '/financial/operation/operationApprove',
    name: 'operationApprove',
    meta: {
      title: '佣金结算审核',
      subMenuName: 'operation',
      icon: 'operationApprove'
    },
    component: () => import('@/page/financial/operation/operationApprove.vue'),
    children: []
  },
  'directProfits': {
    path: '/financial/directProfits',
    name: 'directProfits',
    meta: {
      title: '直连分润导入',
      icon: 'directProfits'
    },
    component: () => import('@/page/financial/directProfits/aliProfits.vue'),
    children: []
  },
  'aliProfits': {
    path: '/financial/directProfits/aliProfits',
    name: 'aliProfits',
    meta: {
      title: '支付宝直连导入',
      subMenuName: 'directProfits',
      icon: 'aliProfits',
      keepAlive: 'AliProfits'
    },
    component: () => import('@/page/financial/directProfits/aliProfits.vue'),
    children: [
      {
        path: '/financial/directProfits/aliProfits/aliProfitsDetail',
        name: 'aliProfitsDetail',
        meta: {
          title: '商户明细',
          subMenuName: 'directProfits',
          parentName: 'financial',
          fatherName: 'aliProfits',
          icon: 'profitsDetail'
        },
        component: () => import('@/page/financial/directProfits/profitsDetail.vue')
      }
    ]
  },
  'wxProfits': {
    path: '/financial/directProfits/wxProfits',
    name: 'wxProfits',
    meta: {
      title: '微信直连导入',
      subMenuName: 'directProfits',
      icon: 'wxProfits',
      keepAlive: 'WxProfits'
    },
    component: () => import('@/page/financial/directProfits/wxProfits.vue'),
    children: [
      {
        path: '/financial/directProfits/aliProfits/wxProfitsDetail',
        name: 'wxProfitsDetail',
        meta: {
          title: '商户明细',
          subMenuName: 'directProfits',
          parentName: 'financial',
          fatherName: 'wxProfits',
          icon: 'profitsDetail'
        },
        component: () => import('@/page/financial/directProfits/profitsDetail.vue')
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
    path: '/agentService/orderManage',
    name: 'orderManage',
    component: () => import('@/page/agentService/orderManage/hardwareOrder.vue'),
    meta: {
      title: '订单管理',
      icon: 'orderManage'
    },
    children: []
  },
  'hardwareOrder': {
    path: '/agentService/orderManage/hardwareOrder',
    name: 'hardwareOrder',
    meta: {
      title: '硬件订购订单',
      subMenuName: 'orderManage',
      icon: 'hardwareOrder',
      keepAlive: "HardwareOrder"
    },
    component: () => import('@/page/agentService/orderManage/hardwareOrder.vue'),
    children: [
      {
        path: '/agentService/orderManage/hardwareOrder/hardwareOrderDetail',
        name: 'hardwareOrderDetail',
        meta: {
          title: '详情',
          subMenuName: 'orderManage',
          parentName: 'agentService',
          fatherName: 'hardwareOrder',
          icon: 'detail'
        },
        component: () => import('@/page/agentService/orderManage/hardwareOrderDetail.vue')
      }
    ]
  },
  'adManage': {
    path: '/agentService/adManage',
    name: 'adManage',
    component: () => import('@/page/agentService/adManage/adManage.vue'),
    meta: {
      title: '广告管理',
      icon: 'adManage'
    },
    children: []
  },
  'adAuth': {
    path: '/agentService/adManage/adAuth',
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
    path: '/agentService/adManage/adPutList',
    name: 'adPutList',
    meta: {
      title: '平台广告投放列表',
      subMenuName: 'adManage',
      icon: 'adPutList',
      keepAlive: 'AdPutList'
    },
    component: () => import('@/page/agentService/adManage/adPutList.vue'),
    children: [
      {
        path: '/agentService/adManage/adPutList/adPutDetail',
        name: 'adPutDetail',
        meta: {
          fatherName: 'adPutList',
          subMenuName: 'adManage',
          parentName: 'agentService',
          title: '详情',
          icon: 'adPutDetail'
        },
        component: () => import('@/page/agentService/adManage/adPutDetail.vue')
      }
    ]
  },
  'platformAdList': {
    path: '/agentService/adManage/platformAdList',
    name: 'platformAdList',
    meta: {
      title: '平台广告列表',
      subMenuName: 'adManage',
      icon: 'platformAdList',
      keepAlive: 'PlatformAdList'
    },
    component: () => import('@/page/agentService/adManage/platformAdList.vue'),
    children: [
      {
        path: '/agentService/adManage/platformAdList/platformAdDetail',
        name: 'platformAdDetail',
        meta: {
          fatherName: 'platformAdList',
          subMenuName: 'adManage',
          parentName: 'agentService',
          title: '新增/编辑',
          icon: 'platformAdDetail'
        },
        component: () => import('@/page/agentService/adManage/platformAdDetail.vue')
      }
    ]
  },
  'thirdParty': {
    path: '/agentService/thirdParty',
    name: 'thirdParty',
    meta: {
      title: '第三方对接列表',
      icon: 'thirdParty',
      keepAlive: 'ThirdParty'
    },
    component: () => import('@/page/agentService/thirdParty.vue'),
    children: [
      {
        path: '/agentService/thirdParty/thirdPartyDetail',
        name: 'thirdPartyDetail',
        meta: {
          fatherName: 'thirdParty',
          parentName: 'agentService',
          title: '第三方对接信息',
          icon: 'thirdPartyDetail'
        },
        component: () => import('@/page/agentService/thirdPartyDetail.vue')
      }
    ]
  },
  'renewalRecord': {
    path: '/agentService/renewalRecord',
    name: 'renewalRecord',
    meta: {
      title: '到期续费记录',
      icon: 'renewalRecord'
    },
    component: () => import('@/page/agentService/renewalRecord.vue')
  },
  'ticketCenter': {
    path: '/agentService/ticketCenter',
    name: 'ticketCenter',
    meta: {
      title: '工单中心',
      icon: 'ticketCenter',
      keepAlive: 'TicketCenter'
    },
    component: () => import('@/page/agentService/ticketCenter/ticketCenter.vue'),
    children: [
      {
        path: '/agentService/ticketCenter/ticketList/ticketListDetail',
        name: 'ticketListDetail',
        meta: {
          subMenuName: 'ticketCenter',
          fatherName: 'ticketList',
          parentName: 'agentService',
          title: '工单详情',
          icon: 'ticketListDetail'
        },
        component: () => import('@/page/agentService/ticketCenter/ticketListDetail.vue')
      }
    ]
  },
  'ticketList': {
    path: '/agentService/ticketCenter/ticketList',
    name: 'ticketList',
    meta: {
      title: '工单列表',
      subMenuName: 'ticketCenter',
      icon: 'ticketList'
    },
    component: () => import('@/page/agentService/ticketCenter/ticketList.vue'),
    children: []
  },
  'ticketStatistics': {
    path: '/agentService/ticketCenter/ticketStatistics',
    name: 'ticketStatistics',
    meta: {
      title: '工单统计',
      subMenuName: 'ticketCenter',
      icon: 'ticketStatistics'
    },
    component: () => import('@/page/agentService/ticketCenter/ticketStatistics.vue')
  },
  'ticketKnowledge': {
    path: '/agentService/ticketCenter/ticketKnowledge',
    name: 'ticketKnowledge',
    meta: {
      title: '工单知识库',
      subMenuName: 'ticketCenter',
      icon: 'ticketKnowledge'
    },
    component: () => import('@/page/agentService/ticketCenter/ticketKnowledge.vue')
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
    path: '/serveMarket/businessModel',
    name: 'businessModel',
    meta: {
      title: '业务模式',
      icon: 'businessModel'
    },
    component: () => import('@/page/serveMarket/businessModel.vue'),
    children: [
      {
        path: '/serveMarket/businessModel/xmgAgentDetail',
        name: 'xmgAgentDetail',
        meta: {
          title: '小马哥代理',
          icon: 'xmgAgent',
          fatherName: 'businessModel',
          parentName: 'serveMarket'
        },
        component: () => import('@/page/serveMarket/xmgAgent.vue')
      },
      {
        path: '/serveMarket/businessModel/omedetail',
        name: 'omedetail',
        meta: {
          title: 'OEM贴牌',
          icon: 'omeAgent',
          fatherName: 'businessModel',
          parentName: 'serveMarket'
        },
        component: () => import('@/page/serveMarket/omeAgent.vue')
      },
      {
        path: '/serveMarket/businessModel/newdetail',
        name: 'newdetail',
        meta: {
          title: '新源码',
          icon: 'newAgent',
          fatherName: 'businessModel',
          parentName: 'serveMarket'
        },
        component: () => import('@/page/serveMarket/newAgent.vue')
      },
      {
        path: '/serveMarket/businessModel/subOrder',
        name: 'subOrder',
        meta: {
          title: '下单页面',
          icon: 'newAgent',
          fatherName: 'businessModel',
          parentName: 'serveMarket'
        },
        component: () => import('@/page/serveMarket/subOrder.vue')
      },
      {
        path: '/serveMarket/businessModel/payAmount',
        name: 'payAmount',
        meta: {
          title: '下单页面',
          icon: 'newAgent',
          fatherName: 'businessModel',
          parentName: 'serveMarket'
        },
        component: () => import('@/page/serveMarket/payAmount.vue')
      },
      {
        path: '/serveMarket/businessModel/payStatus',
        name: 'payStatus',
        meta: {
          title: '下单页面',
          icon: 'newAgent',
          fatherName: 'businessModel',
          parentName: 'serveMarket'
        },
        component: () => import('@/page/serveMarket/payStatus.vue')
      }
    ]
  },
  'tradingChannel': {
    path: '/serveMarket/tradingChannel',
    name: 'tradingChannel',
    meta: {
      title: '交易通道',
      icon: 'tradingChannel',
      keepAlive: 'TradingChannel'
    },
    component: () => import('@/page/serveMarket/tradingChannel.vue'),
    children: [
      {
        path: '/serveMarket/tradingChannel/lsBuyIndex',
        name: 'lsBuyIndex',
        meta: {
          title: '乐刷通道',
          icon: 'lsBuyIndex',
          fatherName: 'tradingChannel',
          parentName: 'serveMarket'
        },
        component: () => import('@/page/serveMarket/lsBuyIndex.vue')
      }
    ]
  },
  'brandCustomization': {
    path: '/serveMarket/brandCustomization',
    name: 'brandCustomization',
    meta: {
      title: '品牌定制',
      icon: 'brandCustomization',
      keepAlive: 'BrandCustomization'
    },
    component: () => import('@/page/serveMarket/brandCustomization.vue'),
    children: [
      {
        path: '/serveMarket/brandCustomization/domainCustomer',
        name: 'domainCustomer',
        meta: {
          title: '域名定制',
          icon: 'domainCustomer',
          fatherName: 'brandCustomization',
          parentName: 'serveMarket'
        },
        component: () => import('@/page/serveMarket/domainCustomer.vue')
      }
    ]
  },
  'applicationCenter': {
    path: '/serveMarket/applicationCenter',
    name: 'applicationCenter',
    meta: {
      title: '应用中心',
      icon: 'applicationCenter',
      keepAlive: 'ApplicationCenter'
    },
    component: () => import('@/page/serveMarket/applicationCenter.vue'),
    children: [
      {
        path: '/serveMarket/applicationCenter/messageCustomer',
        name: 'messageCustomer',
        meta: {
          title: '短信充值',
          icon: 'messageCustomer',
          fatherName: 'applicationCenter',
          parentName: 'serveMarket'
        },
        component: () => import('@/page/serveMarket/messageCustomer.vue')
      }
    ]
  },
  'equipmentMall': {
    path: '/serveMarket/equipmentMall',
    name: 'equipmentMall',
    meta: {
      title: '设备商城',
      icon: 'equipmentMall',
      keepAlive: 'EquipmentMall'
    },
    component: () => import('@/page/serveMarket/equipmentMall.vue'),
    children: [
      {
        path: '/serveMarket/equipmentMall/equimentDetail',
        name: 'equimentDetail',
        meta: {
          title: '设备详情',
          icon: 'equimentDetail',
          fatherName: 'equipmentMall',
          parentName: 'serveMarket'
        },
        component: () => import('@/page/serveMarket/equimentDetail.vue')
      },
      {
        path: '/serveMarket/equipmentMall/shoppingCart',
        name: 'shoppingCart',
        meta: {
          title: '购物车',
          icon: 'shoppingCart',
          fatherName: 'equipmentMall',
          parentName: 'serveMarket'
        },
        component: () => import('@/page/serveMarket/shoppingCart.vue')
      },
      {
        path: '/serveMarket/equipmentMall/equimentOrder',
        name: 'equimentOrder',
        meta: {
          title: '下单',
          icon: 'equimentOrder',
          fatherName: 'equipmentMall',
          parentName: 'serveMarket'
        },
        component: () => import('@/page/serveMarket/equimentOrder.vue')
      },
      {
        path: '/serveMarket/equipmentMall/equimentPay',
        name: 'equimentPay',
        meta: {
          title: '支付',
          icon: 'equimentPay',
          fatherName: 'equipmentMall',
          parentName: 'serveMarket'
        },
        component: () => import('@/page/serveMarket/equimentPay.vue')
      },
      {
        path: '/serveMarket/equipmentMall/orderRecords',
        name: 'orderRecords',
        meta: {
          title: '订单记录',
          icon: 'orderRecords',
          fatherName: 'equipmentMall',
          parentName: 'serveMarket'
        },
        component: () => import('@/page/serveMarket/orderRecords.vue')
      },
      {
        path: '/serveMarket/equipmentMall/equimentOrderDetail',
        name: 'equimentOrderDetail',
        meta: {
          title: '订单详情',
          icon: 'equimentOrderDetail',
          fatherName: 'equipmentMall',
          parentName: 'serveMarket'
        },
        component: () => import('@/page/serveMarket/equimentOrderDetail.vue')
      }
    ]
  },
  'purchasedItems': {
    path: '/serveMarket/purchasedItems',
    name: 'purchasedItems',
    meta: {
      title: '订购记录',
      icon: 'purchasedItems'
    },
    component: () => import('@/page/serveMarket/purchasedItems.vue')
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
    path: '/message/serviceAnnouncementList',
    name: 'serviceAnnouncementList',
    meta: {
      title: '服务商公告',
      icon: 'serviceAnnouncementList',
      keepAlive: 'ServiceAnnouncementList'
    },
    component: () => import('@/page/message/serviceAnnouncementList.vue'),
    children: [
      {
        path: '/message/serviceAnnouncementList/agentAnnounceDetail',
        name: 'agentAnnounceDetail',
        meta: {
          title: '编辑服务商公告',
          icon: 'agentAnnounceDetail',
          fatherName: 'serviceAnnouncementList',
          parentName: 'message'
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
      title: '成员效率',
      icon: 'task'
    },
    children: []
  },
  'statistics': {
    path: '/task/statistics',
    name: 'statistics',
    meta: {
      title: '工作任务统计',
      icon: 'statistics',
      keepAlive: 'Statistics'
    },
    component: () => import('@/page/task/statistics.vue'),
    children: [
      {
        path: '/task/statistics/statisticsDetail',
        name: 'statisticsDetail',
        meta: {
          title: '工作任务统计详情',
          icon: 'statisticsDetail',
          fatherName: 'statistics',
          parentName: 'task'
        },
        component: () => import('@/page/task/statisticsDetail.vue')
      },
      {
        path: '/task/statistics/statisticsAll',
        name: 'statisticsAll',
        meta: {
          title: '工作任务统计详情',
          icon: 'statisticsAll',
          fatherName: 'statistics',
          parentName: 'task'
        },
        component: () => import('@/page/task/statisticsAll.vue')
      }
    ]
  },
  'dataMarket': {
    path: '/dataMarket',
    name: 'dataMarket',
    component: Layout,
    meta: {
      title: '数据大盘',
      icon: 'iconshujudapan'
    },
    children: []
  },
  'transactionData': {
    path: '/dataMarket/transactionData',
    name: 'transactionData',
    meta: {
      title: '交易数据',
      icon: 'transactionData'
    },
    component: () => import('@/page/dataMarket/transactionData.vue'),
    children: []
  },
  'merchantData': {
    path: '/dataMarket/merchantData',
    name: 'merchantData',
    meta: {
      title: '商户数据',
      icon: 'merchantData',
      keepAlive: 'MerchantData'
    },
    component: () => import('@/page/dataMarket/merchantData.vue'),
    children: [
      {
        path: '/dataMarket/merchantData/merchantDataDetail',
        name: 'merchantDataDetail',
        meta: {
          fatherName: 'merchantDataDetail',
          parentName: 'dataMarket',
          title: '详情',
          icon: 'merchantDataDetail',
          refreshDom: true
        },
        component: () => import('@/page/dataMarket/merchantDataDetail.vue')
      }
    ]
  },
  'serviceData': {
    path: '/dataMarket/serviceData',
    name: 'serviceData',
    meta: {
      title: '服务商数据',
      icon: 'serviceData',
      keepAlive: 'ServiceData'
    },
    component: () => import('@/page/dataMarket/serviceData.vue'),
    children: [
      {
        path: '/dataMarket/serviceData/serviceDataDetail',
        name: 'serviceDataDetail',
        meta: {
          fatherName: 'serviceData',
          parentName: 'dataMarket',
          title: '详情',
          icon: 'serviceDataDetail',
          refreshDom: true
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
    path: '/deviceManage/stock',
    name: 'stock',
    component: () => import('@/page/device/stock/stockList.vue'),
    meta: {
      title: '库存管理',
      icon: 'stock'
    },
    children: []
  },
  'stockList': {
    path: '/deviceManage/stock/stockList',
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
    path: '/deviceManage/stock/stockSave',
    name: 'stockSave',
    component: () => import('@/page/device/stock/stockSave.vue'),
    meta: {
      title: '入库管理',
      icon: 'stockSave',
      subMenuName: 'stock',
      keepAlive: 'StockSave'
    },
    children: [
      {
        path: '/deviceManage/stock/stockSave/stockDetail',
        name: 'stockDetail',
        meta: {
          fatherName: 'stockSave',
          parentName: 'deviceManage',
          title: '入库详情',
          icon: 'stockDetail',
          subMenuName: 'stock'
        },
        component: () => import('@/page/device/stock/saveDetail.vue')
      }
    ]
  },
  'stockOut': {
    path: '/deviceManage/stock/stockOut',
    name: 'stockOut',
    component: () => import('@/page/device/stock/stockOut.vue'),
    meta: {
      title: '出库管理',
      icon: 'stockOut',
      subMenuName: 'stock',
      keepAlive: 'StockOut'
    },
    children: [
      {
        path: '/deviceManage/stock/stockSave/outDetail',
        name: 'outDetail',
        meta: {
          fatherName: 'stockOut',
          parentName: 'deviceManage',
          title: '出库详情',
          icon: 'outDetail',
          subMenuName: 'stock'
        },
        component: () => import('@/page/device/stock/outDetail.vue')
      }
    ]
  },
  'authorized': {
    path: '/deviceManage/stock/authorized',
    name: 'authorized',
    component: () => import('@/page/device/stock/authorized.vue'),
    meta: {
      title: '设备授权激活',
      subMenuName: 'stock',
      icon: 'authorized'
    },
    children: []
  },
  'usageManage': {
    path: '/deviceManage/usageManage',
    name: 'usageManage',
    component: () => import('@/page/device/usageManage/usageList.vue'),
    meta: {
      title: '设备使用管理',
      icon: 'usageManage'
    },
    children: []
  },
  'usageList': {
    path: '/deviceManage/usageManage/usageList',
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
    path: '/deviceManage/usageManage/repairList',
    name: 'repairList',
    component: () => import('@/page/device/usageManage/repairList.vue'),
    meta: {
      title: '设备维修',
      icon: 'repairList',
      subMenuName: 'usageManage',
      keepAlive: 'RepairList'
    },
    children: [
      {
        path: '/deviceManage/usageManage/repairList/repairDetail',
        name: 'repairDetail',
        meta: {
          fatherName: 'repairList',
          title: '详情',
          icon: 'repairDetail',
          subMenuName: 'usageManage',
          parentName: 'deviceManage'
        },
        component: () => import('@/page/device/usageManage/repairDetail.vue')
      }
    ]
  },
  'deviceData': {
    path: '/deviceManage/usageManage/deviceData',
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
    path: '/deviceManage/shopCenter',
    name: 'shopCenter',
    component: () => import('@/page/device/shopCenter/shopCenter.vue'),
    meta: {
      title: '商城管理',
      icon: 'shopCenter',
      keepAlive: 'ShopCenter'
    },
    children: [
      {
        path: '/deviceManage/shopCenter/shopCenterDetail',
        name: 'shopCenterDetail',
        meta: {
          fatherName: 'shopCenter',
          title: '商城详情',
          icon: 'shopCenterDetail',
          parentName: 'deviceManage'
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
      title: '审核与签约',
      icon: 'approval'
    },
    children: []
  },
  'checkMerchant': {
    path: '/approval/checkMerchant',
    name: 'checkMerchant',
    component: () => import('@/page/approval/merchantCheck/merchantCheck.vue'),
    meta: {
      title: '商户审核',
      icon: 'checkMerchant'
    },
    children: []
  },
  'indirectList': {
    path: '/approval/checkMerchant/indirectList',
    name: 'indirectList',
    component: () => import('@/page/approval/merchantCheck/indirectList.vue'),
    meta: {
      title: '间连审核',
      icon: 'indirectList',
      subMenuName: 'checkMerchant',
      keepAlive: 'IndirectList'
    },
    children: [
      {
        path: '/approval/checkMerchant/indirectList/indirectListDetail',
        name: 'indirectListDetail',
        meta: {
          fatherName: 'indirectList',
          title: '间连审核列表',
          icon: 'indirectListDetail',
          subMenuName: 'checkMerchant',
          parentName: 'approval'
        },
        component: () => import('@/page/approval/merchantCheck/indirectListDetail.vue')
      },
      {
        path: '/approval/checkMerchant/indirectList/indirectRecordDetail',
        name: 'indirectRecordDetail',
        meta: {
          fatherName: 'indirectList',
          title: '间连审核记录',
          icon: '间连审核记录',
          subMenuName: 'checkMerchant',
          parentName: 'approval'
        },
        component: () => import('@/page/approval/merchantCheck/indirectRecordDetail.vue')
      }
    ]
  },
  'settlementList': {
    path: '/approval/checkMerchant/settlementList',
    name: 'settlementList',
    component: () => import('@/page/approval/merchantCheck/settlementList.vue'),
    meta: {
      title: '结算卡修改审核',
      icon: 'settlementList',
      subMenuName: 'checkMerchant',
      keepAlive: 'SettlementList'
    },
    children: [
      {
        path: '/approval/checkMerchant/settlementList/settlementListDetail',
        name: 'settlementListDetail',
        meta: {
          fatherName: 'settlementList',
          title: '结算卡修改审核详情',
          icon: 'settlementListDetail',
          subMenuName: 'checkMerchant',
          parentName: 'approval'
        },
        component: () => import('@/page/approval/merchantCheck/settlementListDetail.vue')
      },
      {
        path: '/approval/checkMerchant/settlementList/settlementRecordDetail',
        name: 'settlementRecordDetail',
        meta: {
          fatherName: 'settlementList',
          title: ' 结算卡修改审核记录',
          icon: 'settlementRecordDetail',
          subMenuName: 'checkMerchant',
          parentName: 'approval'
        },
        component: () => import('@/page/approval/merchantCheck/settlementRecordDetail.vue')
      }
    ]
  },
  'aliDirectList': {
    path: '/approval/checkMerchant/aliDirectList',
    name: 'aliDirectList',
    component: () => import('@/page/approval/merchantCheck/aliDirectList.vue'),
    meta: {
      title: '支付宝直连审核',
      icon: 'aliDirectList',
      subMenuName: 'checkMerchant',
      keepAlive: 'AliDirectList'
    },
    children: [
      {
        path: '/approval/checkMerchant/aliDirectList/aliDirectListDetail',
        name: 'aliDirectListDetail',
        meta: {
          fatherName: 'aliDirectList',
          title: '支付宝直连审核详情',
          icon: 'aliDirectListDetail',
          subMenuName: 'checkMerchant',
          parentName: 'approval'
        },
        component: () => import('@/page/approval/merchantCheck/aliDirectListDetail.vue')
      },
      {
        path: '/approval/checkMerchant/aliDirectList/aliDirectRecordDetail',
        name: 'aliDirectRecordDetail',
        meta: {
          fatherName: 'aliDirectList',
          title: '支付宝直连审核记录',
          icon: 'aliDirectRecordDetail',
          subMenuName: 'checkMerchant',
          parentName: 'approval'
        },
        component: () => import('@/page/approval/merchantCheck/aliDirectRecordDetail.vue')
      }
    ]
  },
  'wxDirectList': {
    path: '/approval/checkMerchant/wxDirectList',
    name: 'wxDirectList',
    component: () => import('@/page/approval/merchantCheck/wxDirectList.vue'),
    meta: {
      title: '微信直连审核',
      icon: 'wxDirectList',
      subMenuName: 'checkMerchant',
      keepAlive: 'WxDirectList'
    },
    children: [
      {
        path: '/approval/checkMerchant/wxDirectList/wxDirectListDetail',
        name: 'wxDirectListDetail',
        meta: {
          fatherName: 'wxDirectList',
          title: '微信直连审核详情',
          icon: 'wxDirectListDetail',
          subMenuName: 'checkMerchant',
          parentName: 'approval'
        },
        component: () => import('@/page/approval/merchantCheck/wxDirectListDetail.vue')
      },
      {
        path: '/approval/checkMerchant/wxDirectList/wxDirectRecordDetail',
        name: 'wxDirectRecordDetail',
        meta: {
          fatherName: 'wxDirectList',
          title: '微信直连审核记录',
          icon: 'wxDirectRecordDetail',
          subMenuName: 'checkMerchant',
          parentName: 'approval'
        },
        component: () => import('@/page/approval/merchantCheck/wxDirectRecordDetail.vue')
      }
    ]
  },
  'checkService': {
    path: '/approval/checkService',
    name: 'checkService',
    component: () => import('@/page/approval/serviceCheck/checkService.vue'),
    meta: {
      title: '下级服务商审核',
      icon: 'checkService',
      keepAlive: 'CheckService'
    },
    children: [
      {
        path: '/approval/checkService/checkServiceListDetail',
        name: 'checkServiceListDetail',
        meta: {
          fatherName: 'checkService',
          title: '下级服务商审核详情',
          icon: 'checkServiceListDetail',
          parentName: 'approval'
        },
        component: () => import('@/page/approval/serviceCheck/checkServiceListDetail.vue')
      }
    ]
  },
  'checkPartner': {
    path: '/approval/checkPartner',
    name: 'checkPartner',
    component: () => import('@/page/approval/partnerCheck/checkPartner.vue'),
    meta: {
      title: '合伙人审核列表',
      icon: 'checkPartner',
      keepAlive: 'CheckPartner'
    },
    children: [
      {
        path: '/approval/checkPartner/checkPartnerListDetail',
        name: 'checkPartnerListDetail',
        meta: {
          fatherName: 'checkPartnerList',
          title: '合伙人审核详情',
          icon: 'checkPartnerListDetail',
          parentName: 'approval'
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
    path: '/systemConfig/userList',
    name: 'userList',
    component: () => import('@/page/systemConfig/userList.vue'),
    meta: {
      title: '成员列表',
      icon: 'userList'
    },
    children: []
  },
  'userManager': {
    path: '/systemConfig/userManager',
    name: 'userManager',
    component: () => import('@/page/systemConfig/userManager.vue'),
    meta: {
      title: '成员管理',
      icon: 'userManager'
    },
    children: []
  },
  'menuManage': {
    path: '/systemConfig/menuManage',
    name: 'menuManage',
    component: () => import('@/page/systemConfig/menuManage/menuManage.vue'),
    meta: {
      title: '菜单管理',
      icon: 'menuManage'
    },
    children: []
  },
  'operationMenu': {
    path: '/systemConfig/menuManage/operationMenu',
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
    path: '/systemConfig/menuManage/agentMenu',
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
    path: '/systemConfig/menuManage/businessMenu',
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
    path: '/systemConfig/approvalManager',
    name: 'approvalManager',
    component: () => import('@/page/systemConfig/approvalManager.vue'),
    meta: {
      title: '审批管理',
      icon: 'approvalManager'
    },
    children: []
  },
  'customForm': {
    path: '/systemConfig/customForm',
    name: 'customForm',
    component: () => import('@/page/systemConfig/customForm.vue'),
    meta: {
      title: '自定义表单',
      icon: 'customForm'
    },
    children: []
  },
  'paramSetting': {
    path: '/systemConfig/paramSetting',
    name: 'paramSetting',
    component: () => import('@/page/systemConfig/paramSetting.vue'),
    meta: {
      title: '参数设置',
      icon: 'paramSetting'
    },
    children: []
  },
  'powerManager': {
    path: '/systemConfig/powerManager',
    name: 'powerManager',
    component: () => import('@/page/systemConfig/powerManager.vue'),
    meta: {
      title: '权限管理',
      icon: 'powerManager',
      keepAlive: 'PowerManager'
    },
    children: [
      {
        path: '/systemConfig/powerManager/powerBtnManager',
        name: 'powerBtnManager',
        component: () => import('@/page/systemConfig/powerBtnManager.vue'),
        meta: {
          fatherName: 'powerManager',
          parentName: 'systemConfig',
          title: '编辑按钮',
          icon: 'powerBtnManager'
        }
      }
    ]
  },
  'agentPowerManager': {
    path: '/systemConfig/agentPowerManager',
    name: 'agentPowerManager',
    component: () => import('@/page/systemConfig/agentPowerManager/agentPowerManager.vue'),
    meta: {
      title: '服务商产品权限',
      icon: 'agentPowerManager'
    },
    children: []
  },
  'agentPcManager': {
    path: '/systemConfig/agentPowerManager/agentPcManager',
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
    path: '/systemConfig/agentPowerManager/agentAppletManager',
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
    path: '/risk/incomingRisk',
    name: 'incomingRisk',
    component: () => import('@/page/risk/incomingRisk/incomingRisk.vue'),
    meta: {
      title: '入件风控',
      icon: 'incomingRisk'
    },
    children: []
  },
  'serviceIncomingRisk': {
    path: '/risk/incomingRisk/serviceIncomingRisk',
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
    path: '/risk/incomingRisk/merchantDataIncomingRisk',
    name: 'merchantDataIncomingRisk',
    component: () => import('@/page/risk/incomingRisk/merchantDataIncomingRisk.vue'),
    meta: {
      title: '商户入件资料风控',
      icon: 'merchantDataIncomingRisk',
      subMenuName: 'incomingRisk',
      keepAlive: 'MerchantDataIncomingRisk'
    },
    children: [
      {
        path: '/risk/incomingRisk/merchantDataIncomingRisk/blackListDetail',
        name: 'blackListDetail',
        meta: {
          fatherName: 'merchantDataIncomingRisk',
          subMenuName: 'incomingRisk',
          parentName: 'risk',
          title: '黑名单列表',
          icon: 'blackListDetail'
        },
        component: () => import('@/page/risk/incomingRisk/blackListDetail.vue')
      }
    ]
  },
  'riskAppeal': {
    path: '/risk/riskAppeal',
    name: 'riskAppeal',
    component: () => import('@/page/risk/riskAppeal/riskAppeal.vue'),
    meta: {
      title: '风控申诉管理',
      icon: 'riskAppeal'
    },
    children: []
  },
  'leRiskList': {
    path: '/risk/riskAppeal/leRiskList',
    name: 'leRiskList',
    component: () => import('@/page/risk/riskAppeal/leRiskList.vue'),
    meta: {
      title: '乐刷风控',
      icon: 'leRiskList',
      subMenuName: 'riskAppeal',
      keepAlive: 'LeRiskList'
    },
    children: [
      {
        path: '/risk/riskAppeal/leRiskList/leRiskDetail',
        name: 'leRiskDetail',
        component: () => import('@/page/risk/riskAppeal/leRiskListDetail.vue'),
        meta: {
          fatherName: 'leRiskList',
          subMenuName: 'riskAppeal',
          parentName: 'risk',
          title: '详情',
          icon: 'detail'
        }
      }
    ]
  },
  'merchantRiskList': {
    path: '/risk/riskAppeal/merchantRiskList',
    name: 'merchantRiskList',
    component: () => import('@/page/risk/riskAppeal/merchantRiskList.vue'),
    meta: {
      title: '平台商户资料风控',
      icon: 'merchantRiskList',
      subMenuName: 'riskAppeal',
      keepAlive: 'MerchantRiskList'
    },
    children: [
      {
        path: '/risk/riskAppeal/merchantRiskList/merchantRiskDetail',
        name: 'merchantRiskDetail',
        component: () => import('@/page/risk/riskAppeal/merchantRiskListDetail.vue'),
        meta: {
          fatherName: 'merchantRiskList',
          subMenuName: 'riskAppeal',
          parentName: 'risk',
          title: '详情',
          icon: 'detail'
        }
      }
    ]
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
    path: '/comSettlement/comset',
    name: 'comset',
    meta: {
      title: '佣金结算',
      icon: 'comset',
      keepAlive: 'Comset'
    },
    component: () => import('@/page/comSettlement/comset.vue'),
    children: [
      {
        path: '/comSettlement/comset/comsetDetail',
        name: 'comsetDetail',
        meta: {
          title: '佣金明细',
          fatherName: 'comset',
          parentName: 'comSettlement',
          icon: 'comsetDetail'
        },
        component: () => import('@/page/comSettlement/comsetDetail.vue')
      },
      {
        path: '/comSettlement/comset/comsetRecord',
        name: 'comsetRecord',
        meta: {
          title: '结算记录',
          fatherName: 'comset',
          parentName: 'comSettlement',
          icon: 'comsetRecord'
        },
        component: () => import('@/page/comSettlement/comsetRecord.vue')
      }
    ]
  },
  topAgent: {
    path: '/topAgent',
    name: 'topAgent',
    component: Layout,
    meta: {
      title: '顶级服务商管理',
      icon: 'iconjinpai'
    },
    children: []
  },
  'topDataMarket': {
    path: '/topAgent/topDataMarket',
    name: 'topDataMarket',
    meta: {
      title: '数据大盘',
      icon: 'topDataMarket',
      keepAlive: 'TopDataMarket'
    },
    component: () => import('@/page/topAgent/topDataMarket.vue'),
    children: [
      {
        path: '/topAgent/topDataMarket/topAgentData',
        name: 'topAgentData',
        meta: {
          fatherName: 'topDataMarket',
          parentName: 'topAgent',
          title: '详情',
          icon: 'topAgentData',
          refreshDom: true
        },
        component: () => import('@/page/topAgent/topAmountDetail.vue')
      }
    ]
  },
  'topAgentList': {
    path: '/topAgent/topAgentList',
    name: 'topAgentList',
    meta: {
      title: '服务商列表',
      icon: 'topAgentList',
      keepAlive: 'TopAgentList'
    },
    component: () => import('@/page/topAgent/topAgentList.vue'),
    children: [
      {
        path: '/topAgent/topAgentList/addTopAgent',
        name: 'addTopAgent',
        meta: {
          title: '添加服务商',
          icon: 'addTopAgent',
          fatherName: 'topAgentList',
          parentName: 'topAgent'
        },
        component: () => import('@/page/topAgent/addTopAgent.vue')
      },
      {
        path: '/topAgent/topAgentList/topAgentDetail',
        name: 'topAgentDetail',
        meta: {
          title: '服务商详情',
          icon: 'topAgentDetail',
          fatherName: 'topAgentList',
          parentName: 'topAgent'
        },
        component: () => import('@/page/topAgent/topAgentDetail.vue')
      }
    ]
  },
  'examineList': {
    path: '/topAgent/examineList',
    name: 'examineList',
    meta: {
      title: '服务商审核列表',
      icon: 'examineList'
    },
    component: () => import('@/page/topAgent/examineList.vue')
  },
  'agentDeploy': {
    path: '/topAgent/agentDeploy',
    name: 'agentDeploy',
    meta: {
      title: '服务器部署',
      icon: 'agentDeploy',
      keepAlive: 'AgentDeploy'
    },
    component: () => import('@/page/topAgent/agentDeploy.vue'),
    children: [
      {
        path: '/topAgent/agentDeploy/deployDetail',
        name: 'deployDetail',
        meta: {
          title: '部署详情',
          icon: 'deployDetail',
          fatherName: 'agentDeploy',
          parentName: 'topAgent'
        },
        component: () => import('@/page/topAgent/deployDetail.vue')
      }
    ]
  },
  marketing: {
    path: '/marketing',
    name: 'marketing',
    component: Layout,
    meta: {
      title: '营销管理',
      icon: 'agent'
    },
    children: []
  },
  'coupon': {
    path: '/marketing/coupon',
    name: 'coupon',
    meta: {
      title: '优惠码',
      subMenuName: '',
      icon: 'coupon',
      keepAlive: 'Coupon'
    },
    component: () => import('@/page/marketing/coupon.vue'),
    children: [
      {
        path: '/marketing/coupon/addCoupon',
        name: 'addCoupon',
        meta: {
          fatherName: 'coupon',
          parentName: 'marketing',
          title: '添加优惠码',
          icon: 'addCoupon'
        },
        component: () => import('@/page/marketing/addCoupon.vue')
      },
      {
        path: '/marketing/coupon/couponDetail',
        name: 'couponDetail',
        meta: {
          fatherName: 'coupon',
          parentName: 'marketing',
          title: '优惠码详情',
          icon: 'couponDetail'
        },
        component: () => import('@/page/marketing/couponDetail.vue')
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
      curr.meta.title = item.text;
      if (item.children && item.children.length > 0) {
        item.children = utils.getNestedArr(item.children, 'children')
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
    if (item.children && item.children.length > 0) {
      page.meta.noRedirect = true
    }
    if (page) {
      page.meta.title = item.text;
      const childRoutes = utils.getNestedArr(page.children, 'children');
      page.children = []
      children.push(page)
      childRoutes.forEach(child => {
        children.push(child)
      })
    } else {
      console.error(`not find page ${item.name} , page's title is ${item.meta.title}`);
    }
  }
}

export default {
  menusToRoutes: menusToRoutes,
  getRouters: getRouters
}

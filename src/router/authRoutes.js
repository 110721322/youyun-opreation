export const authRoutes = [
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
      }
    ]
  },
  {
    text: '财务中心',
    type: 'ios-paper',
    path: 'financial',
    name: 'financial',
    isShow: true,
    meta: {
      title: '财务中心',
      icon: 'financial'
    },
    children: [
      {
        text: '分润统计表',
        type: 'ios-paper',
        name: 'shareProfit',
        path: 'shareProfit',
        isShow: true,
        meta: {
          title: '分润统计表',
          icon: 'shareProfit'
        },
        children: [
          {
            type: 'ios-grid',
            name: 'serviceProfit',
            text: '服务商分润统计',
            path: 'serviceProfit',
            isShow: true,
            meta: {
              title: '服务商分润统计',
              icon: 'serviceProfit'
            }
          },
          {
            type: 'ios-grid',
            name: 'interconnection',
            text: '间联分润统计',
            path: 'interconnection',
            isShow: true,
            meta: {
              title: '间联分润统计',
              icon: 'interconnection'
            }
          }
        ]
      },
      {
        text: '活动奖励',
        type: 'ios-paper',
        name: 'activityAward',
        path: 'activityAward',
        isShow: true,
        meta: {
          title: '活动奖励',
          icon: 'activityAward'
        },
        children: [
          {
            type: 'ios-grid',
            name: 'aplyAward',
            text: '支付宝蜻蜓奖励',
            path: 'aplyAward',
            isShow: true,
            meta: {
              title: '间联分润统计',
              icon: 'aplyAward'
            }
          }
        ]
      },
      {
        text: '财务审核',
        type: 'ios-paper',
        name: 'transferReview',
        path: 'transferReview',
        isShow: true,
        meta: {
          title: '财务审核',
          icon: 'transferReview'
        },
        children: [
          {
            type: 'ios-grid',
            name: 'commission',
            text: '佣金结算审核',
            path: 'commission',
            isShow: true,
            meta: {
              title: '佣金结算审核',
              icon: 'commission'
            }
          },
          {
            type: 'ios-grid',
            name: 'publicTransfer',
            text: '对公转账审核',
            path: 'publicTransfer',
            isShow: true,
            meta: {
              title: '对公转账审核',
              icon: 'publicTransfer'
            }
          }
        ]
      },
      {
        text: '运营审核',
        type: 'ios-paper',
        name: 'operation',
        path: 'operation',
        isShow: true,
        meta: {
          title: '运营审核',
          icon: 'operation'
        },
        children: [
          {
            type: 'ios-grid',
            name: 'operationApprove',
            text: '佣金结算审核',
            path: 'operationApprove',
            isShow: true,
            meta: {
              title: '佣金结算审核',
              icon: 'operationApprove'
            }
          }
        ]
      },
      {
        text: '直连分润导入',
        type: 'ios-paper',
        name: 'directProfits',
        path: 'directProfits',
        isShow: true,
        meta: {
          title: '直连分润导入',
          icon: 'directProfits'
        },
        children: [
          {
            type: 'ios-grid',
            name: 'aliProfits',
            text: '支付宝直连导入',
            path: 'aliProfits',
            isShow: true,
            meta: {
              title: '支付宝直连导入',
              icon: 'aliProfits'
            }
          },
          {
            type: 'ios-grid',
            name: 'wxProfits',
            text: '微信直连导入',
            path: 'wxProfits',
            isShow: true,
            meta: {
              title: '微信直连导入',
              icon: 'wxProfits'
            }
          },
          {
            type: 'ios-grid',
            name: 'profitsDetail',
            text: '商户明细',
            path: 'profitsDetail',
            isShow: false,
            meta: {
              title: '商户明细',
              icon: 'profitsDetail'
            }
          }
        ]
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
        children: [
          {
            type: 'ios-grid',
            name: 'hardwareOrder',
            text: '硬件订购订单',
            path: 'hardwareOrder',
            isShow: true,
            meta: {
              title: '硬件订购订单',
              icon: 'hardwareOrder'
            }
          }
        ]
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
      },
      {
        type: 'ios-grid',
        name: 'thirdParty',
        text: '第三方对接列表',
        path: 'thirdParty',
        isShow: true,
        meta: {
          title: '第三方对接列表',
          icon: 'thirdParty'
        }
      },
      {
        type: 'ios-grid',
        name: 'renewalRecord',
        text: '到期续费记录',
        path: 'renewalRecord',
        isShow: true,
        meta: {
          title: '到期续费记录',
          icon: 'renewalRecord'
        }
      },
      {
        type: 'ios-grid',
        name: 'ticketList',
        text: '工单列表',
        path: 'ticketList',
        isShow: false,
        meta: {
          title: '工单列表',
          icon: 'ticketList'
        }
      },
      {
        type: 'ios-grid',
        name: 'ticketCenter',
        text: '工单中心',
        path: 'ticketCenter',
        isShow: true,
        meta: {
          title: '工单中心',
          icon: 'ticketCenter'
        },
        children: [
          {
            type: 'ios-grid',
            name: 'ticketStatistics',
            text: '工单统计',
            path: 'ticketStatistics',
            isShow: true,
            meta: {
              title: '工单统计',
              icon: 'ticketStatistics'
            }
          },
          {
            type: 'ios-grid',
            name: 'ticketKnowledge',
            text: '工单知识库',
            path: 'ticketKnowledge',
            isShow: true,
            meta: {
              title: '工单知识库',
              icon: 'ticketKnowledge'
            }
          }
        ]
      }
    ]
  },
  {
    text: '服务市场',
    type: 'ios-paper',
    path: 'serveMarket',
    name: 'serveMarket',
    isShow: true,
    meta: {
      title: '服务市场',
      icon: '服务市场'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'businessModel',
        text: '业务模式',
        path: 'businessModel',
        isShow: true,
        meta: {
          title: '业务模式',
          icon: 'businessModel'
        }
      },
      {
        type: 'ios-grid',
        name: 'tradingChannel',
        text: '交易通道',
        path: 'tradingChannel',
        isShow: true,
        meta: {
          title: '交易通道',
          icon: 'tradingChannel'
        }
      },
      {
        type: 'ios-grid',
        name: 'brandCustomization',
        text: '品牌定制',
        path: 'brandCustomization',
        isShow: true,
        meta: {
          title: '品牌定制',
          icon: 'brandCustomization'
        }
      },
      {
        type: 'ios-grid',
        name: 'applicationCenter',
        text: '应用中心',
        path: 'applicationCenter',
        isShow: true,
        meta: {
          title: '应用中心',
          icon: 'applicationCenter'
        }
      },
      {
        type: 'ios-grid',
        name: 'equipmentMall',
        text: '设备商城',
        path: 'equipmentMall',
        isShow: true,
        meta: {
          title: '设备商城',
          icon: 'equipmentMall'
        }
      },
      {
        type: 'ios-grid',
        name: 'purchasedItems',
        text: '已购项目',
        path: 'purchasedItems',
        isShow: true,
        meta: {
          title: '已购项目',
          icon: 'purchasedItems'
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
        }
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
        }
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
        name: 'menuManage',
        path: 'menuManage',
        isShow: true,
        meta: {
          title: '菜单管理',
          icon: 'menuManage'
        },
        children: [
          {
            text: '运营后台菜单',
            type: 'ios-paper',
            name: 'operationMenu',
            path: 'operationMenu',
            isShow: true,
            meta: {
              title: '运营后台菜单',
              icon: 'operationMenu'
            }
          },
          {
            text: '服务商后台菜单',
            type: 'ios-paper',
            name: 'agentMenu',
            path: 'agentMenu',
            isShow: true,
            meta: {
              title: '服务商后台菜单',
              icon: 'agentMenu'
            }
          },
          {
            text: '商应小程序菜单',
            type: 'ios-paper',
            name: 'businessMenu',
            path: 'businessMenu',
            isShow: true,
            meta: {
              title: '商应小程序菜单',
              icon: 'businessMenu'
            }
          }
        ]
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
      icon: 'risk'
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
  },
  {
    text: '佣金结算',
    type: 'ios-paper',
    path: 'comSettlement',
    name: 'comSettlement',
    isShow: true,
    meta: {
      title: '佣金结算',
      icon: 'comSettlement'
    },
    children: [
      {
        type: 'ios-grid',
        name: 'comset',
        text: '佣金结算',
        path: 'comset',
        isShow: true,
        meta: {
          title: '佣金结算',
          icon: 'comset'
        }
      }
    ]
  },
  /* {
    text: '对公转账审核',
    type: 'ios-paper',
    path: 'transferReview',
    name: 'transferReview',
    isShow: true,
    meta: {
      title: '对公转账审核',
      icon: 'transferReview'
    },
    children: [
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
      },
      {
        type: 'ios-grid',
        name: 'transferReview',
        text: '财务审核',
        path: 'transferReview',
        isShow: true,
        meta: {
          title: '财务审核',
          icon: 'transferReview'
        },
        children: [
          {
            text: '财务结算审核',
            type: 'ios-paper',
            name: 'comSettlement',
            path: 'comSettlement',
            isShow: true,
            meta: {
              title: '财务结算审核',
              icon: 'comSettlement'
            }
          },
          {
            text: '财务订购审核',
            type: 'ios-paper',
            name: 'financialOrder',
            path: 'financialOrder',
            isShow: true,
            meta: {
              title: '财务订购审核',
              icon: 'financialOrder'
            }
          },
          {
            text: '财务续费审核',
            type: 'ios-paper',
            name: 'financialRenewal',
            path: 'financialRenewal',
            isShow: true,
            meta: {
              title: '财务续费审核',
              icon: 'financialRenewal'
            }
          }
        ]
      }
    ]
  },*/
  {
    text: '顶级服务商管理',
    type: 'ios-paper',
    path: 'topAgent',
    name: 'topAgent',
    isShow: true,
    meta: {
      title: '顶级服务商管理',
      icon: 'topAgent'
    },
    children: [
      {
        text: '数据大盘',
        type: 'ios-paper',
        name: 'topDataMarket',
        path: 'topDataMarket',
        isShow: true,
        meta: {
          title: '数据大盘',
          icon: 'topDataMarket'
        }
      },
      {
        text: '服务商列表',
        type: 'ios-paper',
        name: 'topAgentList',
        path: 'topAgentList',
        isShow: true,
        meta: {
          title: '服务商列表',
          icon: 'topAgentList'
        }
      },
      {
        text: '服务商审核列表',
        type: 'ios-paper',
        name: 'examineList',
        path: 'examineList',
        isShow: true,
        meta: {
          title: '服务商审核列表',
          icon: 'examineList'
        }
      },
      {
        text: '服务器部署',
        type: 'ios-paper',
        name: 'agentDeploy',
        path: 'agentDeploy',
        isShow: true,
        meta: {
          title: '服务器部署',
          icon: 'agentDeploy'
        }
      }
    ]
  },
  {
    text: '营销管理',
    type: 'ios-paper',
    name: 'marketing',
    path: 'marketing',
    isShow: true,
    meta: {
      title: '营销管理',
      icon: 'marketing'
    },
    children: [
      {
        text: '优惠券',
        type: 'ios-paper',
        name: 'coupon',
        path: 'coupon',
        isShow: true,
        meta: {
          title: '优惠券',
          icon: 'coupon'
        }
      }
    ]
  }
]
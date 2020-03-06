import Layout from '@/layout'

const asyncRoutes = {
  merchant: {
    path: '/merchant',
    name: 'merchant',
    component: () => import('./index.vue'),
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
    component: () => import('./index.vue'),
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
        name: 'work',
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
  message: {
    path: '/message',
    name: 'message',
    component: () => import('./index.vue'),
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
  task: {
    path: '/task',
    name: 'task',
    component: () => import('./index.vue'),
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
    component: () => import('./index.vue'),
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

  // children.push({
  //     path: 'error',
  //     name: 'error',
  //     component: () => import('../page/404/404.vue')
  // })

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
  } else if (item.children) {
    item.children.forEach(e => {
      generateRoutes(children, e)
    })
  }
}

export default {
  menusToRoutes: menusToRoutes,
  getRouters: getRouters
}

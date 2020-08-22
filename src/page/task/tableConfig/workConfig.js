export const WORK_CONFIG = {
  // 商户结算失败
  gridConfig: [
    {
      label: '商户ID',
      prop: 'merchantNo'
    },
    {
      label: '商户名称',
      prop: 'merchantName'
    },
    {
      label: '所属服务商',
      prop: 'agentName'
    },
    {
      label: '交易通道',
      prop: 'channelCode',
      render: (h, params) => {
        if (params.row.channelCode === 'leshua') {
          return h(
            'span', '乐刷'
          )
        }
        if (params.row.channelCode === 'alipay') {
          return h(
            'span', '支付宝'
          )
        }
        if (params.row.channelCode === 'wechat') {
          return h(
            'span', '微信'
          )
        }
      }
    },
    {
      label: '结算金额',
      prop: 'totalSettleAmount'
    },
    {
      label: '失败原因',
      prop: 'failReason'
    }
  ],
  // 商户入件操作
  merchantExamine: [
    {
      label: '商户ID',
      prop: 'merchantNo'
    },
    {
      label: '商户名称',
      prop: 'merchantName'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    }
  ],
  // 服务商到期
  overTime: [
    {
      label: '商户ID',
      prop: 'agentNo'
    },
    {
      label: '商户名称',
      prop: 'agentName'
    },
    {
      label: '到期时间',
      prop: 'expireDate'
    }
  ],
  // 佣金结算
  commission: [
    {
      label: '商户ID',
      prop: 'agentNo'
    },
    {
      label: '商户名称',
      prop: 'agentName'
    }
  ],
  commissionSettle: [
    {
      label: '商户ID',
      prop: 'agentNo'
    },
    {
      label: '商户名称',
      prop: 'agentName'
    }
  ],
  // 预约沟通
  subscribe: [
    {
      label: '商户ID',
      prop: 'agentNo'
    },
    {
      label: '商户名称',
      prop: 'agentName'
    },
    {
      label: '预约沟通时间',
      prop: 'remindTime'
    }
  ],
  // 新增服务商
  newAgent: [
    {
      label: '服务商ID',
      prop: 'agentNo'
    },
    {
      label: '商户名称',
      prop: 'agentName'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    }
  ],
  // 客单价异常
  unitPrice: [
    {
      label: '商户ID',
      prop: 'merchantNo'
    },
    {
      label: '商户名称',
      prop: 'merchantName'
    },
    {
      label: '所属服务商',
      prop: 'agentName'
    },
    {
      label: '客单价',
      prop: 'perAmount'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    }
  ],
  // 交易数据异常
  transaction: [
    {
      label: '商户ID',
      prop: 'merchantNo'
    },
    {
      label: '商户名称',
      prop: 'merchantName'
    },
    {
      label: '所属服务商',
      prop: 'agentName'
    },
    {
      label: '交易环比(%)',
      prop: 'perAmount'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    }
  ],
  // 服务商资料补全
  agentCompletion: [
    {
      label: '商户ID',
      prop: 'agentNo'
    },
    {
      label: '商户名称',
      prop: 'agentName'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    }
  ],
  // 设备出库
  stock: [
    {
      label: '订购物品',
      prop: 'orderGoods'
    },
    {
      label: '订购数量',
      prop: 'count'
    },
    {
      label: '订购服务商',
      prop: 'agentName'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    }
  ],
  // 工单
  distribution: [
    {
      label: '问题模块',
      prop: 'questionModule'
    },
    {
      label: '问题类型',
      prop: 'questionType'
    },
    {
      label: '问题内容',
      prop: 'questionContent'
    },
    {
      label: '服务商ID',
      prop: 'agentNo'
    },
    {
      label: '服务商名称',
      prop: 'agentName'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    }
  ],
  // 乐刷申诉审核
  leSuhaExamine: [
    {
      label: '服务商ID',
      prop: 'agentNo'
    },
    {
      label: '服务商名称',
      prop: 'agentName'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    }
  ],
  // 平台资料申诉审核
  channelExamine: [
    {
      label: '服务商ID',
      prop: 'agentNo'
    },
    {
      label: '服务商名称',
      prop: 'agentName'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    }
  ],
  // crud的模态框表单配置，可配置表单类型，验证规则，是否必填,col-span布局可通过span参数配置

  // crud的操作按钮配置，基础按钮有添加、修改、删除、查看，还可以配置扩展按钮
  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: []
  },
  // 表单基础数据类型，需要预先赋值
  formModel: {
    id: '',
    tel: '',
    name: '',
    email: '',
    status: '',
    create_time: '',
    expand: '',
    roleIdList: []
  },
  hideEditArea: true
}

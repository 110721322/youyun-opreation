export const USER_CONFIG = {
  gridConfig: [
    {
      label: '沟通时间',
      prop: 'createTime',
      width: '150px'
    },
    {
      label: '沟通人',
      prop: 'linkmanName',
      width: '150px'
    },
    {
      label: '联系电话',
      prop: 'phoneNum',
      width: '150px'
    },
    {
      label: '备注',
      prop: 'remark',
      width: '150px'
    }
  ],
  // crud的模态框表单配置，可配置表单类型，验证规则，是否必填,col-span布局可通过span参数配置

  // crud的操作按钮配置，基础按钮有添加、修改、删除、查看，还可以配置扩展按钮
  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: [
      {
        name: '详情',
        emitName: 'detail',
        type: 'text'
      }
    ]
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
  }
};
export const USER_CONFIG2 = {
  gridConfig: [
    {
      label: '沟通时间',
      prop: 'createTime',
      width: '150px'
    },
    {
      label: '沟通人',
      prop: 'linkmanName',
      width: '150px'
    },
    {
      label: '沟通主题',
      prop: 'theme',
      width: '150px',
      render: (h, params) => {
        if (params.row.theme === 'dailyTalk') {
          return h(
            'span', '日常沟通'
          )
        }
        if (params.row.theme === 'dailyTask') {
          return h(
            'span', '日常沟通'
          )
        }
        if (params.row.theme === 'newTalk') {
          return h(
            'span', '新单沟通'
          )
        }
      }
    },
    {
      label: '沟通副主题',
      prop: 'subTheme',
      width: '150px',
      render: (h, params) => {
        if (params.row.subTheme === 'question') {
          return h(
            'span', '问题处理'
          )
        }
        if (params.row.subTheme === 'guest') {
          return h(
            'span', '客情维护'
          )
        }
        if (params.row.subTheme === 'train') {
          return h(
            'span', '通知'
          )
        }
        if (params.row.subTheme === 'notify') {
          return h(
            'span', '培训'
          )
        }
        if (params.row.subTheme === 'guest') {
          return h(
            'span', '客情维护'
          )
        }
        if (params.row.subTheme === 'settleFail') {
          return h(
            'span', '结算失败'
          )
        }
        if (params.row.subTheme === 'msgRecharge') {
          return h(
            'span', '短信充值'
          )
        }
        if (params.row.subTheme === 'priceException') {
          return h(
            'span', '客单价异常'
          )
        }
        if (params.row.subTheme === 'tradeException') {
          return h(
            'span', '交易数据异常'
          )
        }
        if (params.row.subTheme === 'open') {
          return h(
            'span', '开户'
          )
        }
        if (params.row.subTheme === 'customerInfo') {
          return h(
            'span', '了解客户信息'
          )
        }
        if (params.row.subTheme === 'teaching') {
          return h(
            'span', '新单教学'
          )
        }
      }
    },
    {
      label: '沟通内容',
      prop: 'content',
      width: '150px'
    }
  ],
  // crud的模态框表单配置，可配置表单类型，验证规则，是否必填,col-span布局可通过span参数配置

  // crud的操作按钮配置，基础按钮有添加、修改、删除、查看，还可以配置扩展按钮
  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: [
      {
        name: '详情',
        emitName: 'detail',
        type: 'text'
      }
    ]
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
  }
};

export const RECORD_CONFIG = {
  gridConfig: [
    {
      label: '操作时间',
      prop: 'createTime',
      width: '150px'
    },
    {
      label: '操作人',
      prop: 'operateUserName',
      width: '150px'
    },
    {
      label: '操作通道',
      prop: 'channel',
      width: '150px',
      render: (h, params) => {
        const actions = new Map([
          ['leshua', '乐刷'],
          ['wechat', '微信'],
          ['alipay', '支付宝'],
          ['default', '']
        ])
        const channelName = actions.get(params.row.channel) || actions.get('default');
        return h(
          'span', channelName
        )
      }
    },
    {
      label: '操作内容',
      prop: 'auditStatus',
      width: '250px',
      render: (h, params) => {
        const actions = new Map([
          ['channelPass', '通过'],
          ['platformAudit', '平台审核中'],
          ['platformReject', '平台驳回'],
          ['channelReject', '通道驳回'],
          ['default', '']
        ])
        const auditStatusName = actions.get(params.row.auditStatus) || actions.get('default');
        return h(
          'span', auditStatusName
        )
      }
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
};

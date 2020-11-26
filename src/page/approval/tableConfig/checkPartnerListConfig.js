export const CHECKPARTNERLIST_CONFIG = {
  gridConfig: [
    {
      label: '合伙人姓名',
      prop: 'partnerName',
      width: '150px'
    },
    {
      label: '合伙人类型',
      prop: 'jobType',
      width: '150px',
      render: (h, params) => {
        if (params.row.jobType === 'inboundMen') {
          return h(
            'span', '入件操作员'
          )
        } else {
          return h(
            'span', '拓展员'
          )
        }
      }
    },
    {
      label: '所属服务商',
      prop: [{ key: 'agentName' }, { key: 'agentNo', label: 'ID:' }],
      width: '150px'
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: '150px'
    },
    {
      label: '所属运营',
      prop: 'partnerName',
      width: '150px'
    },
    {
      label: '审核状态',
      prop: 'contractStatus',
      width: '150px',
      render: (h, params) => {
        const actions = new Map([
          ['waitSign', '待审核'],
          ['audit', '审核中'],
          ['success', '审核通过'],
          ['reject', '审核拒绝'],
          ['default', '待审核']
        ])
        const auditStatusName = actions.get(params.row.contractStatus) || actions.get('default')
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
    expands: [
      {
        name: '详情',
        emitName: 'detail',
        type: 'text',
        isShow: ($item) => {
          return $item.contractStatus !== 'waitSign'
        }
      },
      {
        name: '审核',
        emitName: 'preApprove',
        type: 'text',
        isShow: ($item) => {
          return $item.contractStatus === 'waitSign'
        }
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
  },
  hideEditArea: false
};

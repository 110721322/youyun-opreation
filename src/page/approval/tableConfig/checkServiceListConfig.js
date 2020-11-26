export const CHECKSERVICELIST_CONFIG = {
  gridConfig: [
    {
      label: '服务商',
      prop: [{ key: 'agentName' }, { key: 'agentNo', label: 'ID:' }],
      width: '150px'
    },
    {
      label: '法人信息',
      prop: [{ key: 'personName', label: '姓名:' }, { key: 'personMobile', label: '电话:' }],
      width: '150px'
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: '150px'
    },
    {
      label: '所属运营',
      prop: 'operationJobName',
      width: '150px'
    },
    {
      label: '审核状态',
      prop: 'contractStatus',
      width: '150px',
      render: (h, params) => {
        const actions = new Map([
          ['audit', ['platformAudit', '待审核']],
          ['waitSign', ['nonOpen', '平台审核中']],
          ['reject', ['reject', '通道审核中']],
          ['success', ['success', '平台驳回']],
          ['default', ['platformAudit', '']]
        ])
        const action = actions.get(params.row.status) || actions.get('default');
        const className = action[0];
        const statusName = action[1];
        return [h('span', {
          'class': "dot " + className
        }), statusName]
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

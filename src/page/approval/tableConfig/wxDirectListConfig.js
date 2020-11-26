export const WXDIRECTLIST_CONFIG = {
  gridConfig: [
    {
      label: '商户名称',
      prop: [{ key: 'merchantName' }, { key: 'merchantNo', label: 'ID:' }],
      width: '150px'
    },
    {
      label: '入件时间',
      prop: 'createTime',
      width: '150px'
    },
    {
      label: '所属运营',
      prop: 'operationUserName',
      width: '150px'
    },
    {
      label: '状态',
      prop: 'status',
      width: '150px',
      render: (h, params) => {
        const actions = new Map([
          ['nonOpen', ['nonOpen', '待审核']],
          ['platformAudit', ['platformAudit', '平台审核中']],
          ['channelAudit', ['channelAudit', '通道审核中']],
          ['platformReject', ['platformReject', '平台驳回']],
          ['channelReject', ['channelReject', '通道驳回']],
          ['channelPass', ['success', '已通过']],
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
          return $item.status !== 'nonOpen'
        }
      },
      {
        name: '预审核',
        emitName: 'preApprove',
        type: 'text',
        isShow: ($item) => {
          return $item.status === 'nonOpen'
        }
      },
      {
        name: '通过',
        emitName: 'pass',
        type: 'text',
        isShow: ($item) => {
          return $item.status === 'channelAudit'
        }
      },
      {
        name: '驳回',
        emitName: 'reject',
        type: 'text',
        isShow: ($item) => {
          return $item.status === 'channelAudit'
        }
      },
      {
        name: '审核记录',
        emitName: 'record',
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
  },
  hideEditArea: false
};

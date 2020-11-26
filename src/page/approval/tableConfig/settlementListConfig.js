export const SETTELMENTLIST_CONFIG = {
  gridConfig: [
    {
      label: '商户',
      prop: [{ key: 'merchantName' }, { key: 'merchantNo', label: 'ID:' }],
      width: '150px'
    },
    {
      label: '通道',
      prop: 'channel',
      width: '150px'
    },
    {
      label: '提交时间',
      prop: 'createTime',
      width: '150px'
    },
    {
      label: '所属运营',
      prop: 'operationName',
      width: '150px'
    },
    {
      label: '状态',
      prop: 'auditStatus',
      width: '150px',
      render: (h, params) => {
        const actions = new Map([
          ['audit', ['platformAudit', '审核中']],
          ['waitSign', ['nonOpen', '待审核']],
          ['reject', ['reject', '已驳回']],
          ['success', ['success', '已通过']],
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
          return $item.auditStatus !== 'waitSign'
        }
      },
      {
        name: '预审核',
        emitName: 'preApprove',
        type: 'text',
        isShow: ($item) => {
          return $item.auditStatus === 'waitSign'
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

export const ALIDIRECTLIST_CONFIG = {
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
        if (params.row.status === 'nonOpen') {
          return h(
            'span', '待审核'
          )
        }
        if (params.row.status === 'platformAudit') {
          return h(
            'span', '平台审核中'
          )
        }
        if (params.row.status === 'channelAudit') {
          return h(
            'span', '通道审核中'
          )
        }
        if (params.row.status === 'platformReject') {
          return h(
            'span', '平台驳回'
          )
        }
        if (params.row.status === 'channelReject') {
          return h(
            'span', '通道驳回'
          )
        }
        if (params.row.status === 'channelPass') {
          return h(
            'span', '审核通过'
          )
        }
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
        name: '预审核',
        emitName: 'preApprove',
        type: 'text',
        isShow: ($item) => {
          if ($item.status === 'nonOpen') {
            return true;
          } else {
            return false
          }
        }
      },
      {
        name: '详情',
        emitName: 'detail',
        type: 'text',
        isShow: ($item) => {
          if ($item.status !== 'nonOpen') {
            return true;
          } else {
            return false
          }
        }
      },
      {
        name: '通过',
        emitName: 'pass',
        type: 'text',
        isShow: ($item) => {
          if ($item.status === 'channelAudit') {
            return true;
          } else {
            return false
          }
        }
      },
      {
        name: '驳回',
        emitName: 'reject',
        type: 'text',
        isShow: ($item) => {
          if ($item.status === 'channelAudit') {
            return true;
          } else {
            return false
          }
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

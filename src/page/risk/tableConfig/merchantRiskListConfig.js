export const LERISKLIST_CONFIG = {
  gridConfig: [
    {
      label: '服务商',
      prop: [{ key: 'agentName' }, { key: 'agentNo', label: "ID:" }],
      width: '150px'
    },
    {
      label: '商户名称',
      prop: 'merchantName',
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
      prop: 'status',
      width: '150px',
      render: (h, params) => {
        if (params.row.status === 'channelReject') {
          return h(
            'span', '已驳回'
          )
        }
        if (params.row.status === 'channelPass') {
          return h(
            'span', '已通过'
          )
        }
        if (params.row.status === 'waitPreAudit') {
          return h(
            'span', '预审核'
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
        name: '详情',
        emitName: 'detail',
        type: 'text',
        isShow: ($item) => {
          if ($item.status !== 'waitPreAudit') {
            return true;
          } else {
            return false
          }
        }
      },
      {
        name: '审核',
        emitName: 'checking',
        type: 'text',
        isShow: ($item) => {
          if ($item.status === 'waitPreAudit') {
            return true;
          } else {
            return false
          }
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

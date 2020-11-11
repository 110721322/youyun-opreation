export const RECORD_CONFIG = {
  gridConfig: [
    {
      label: '操作时间',
      prop: 'createTime',
      width: '150px'
    },
    {
      label: '操作人',
      prop: 'operationName',
      width: '150px'
    },
    {
      label: '操作通道',
      prop: 'channel',
      width: '150px'
    },
    {
      label: '操作内容',
      prop: 'auditStatus',
      width: '250px',
      render: (h, params) => {
        if (params.row.auditStatus === 'channelPass') {
          return h(
            'span', '通过'
          )
        }
        if (params.row.auditStatus === 'platformAudit') {
          return h(
            'span', '平台审核中'
          )
        }
        if (params.row.auditStatus === 'platformReject') {
          return h(
            'span', '平台驳回'
          )
        }
        if (params.row.auditStatus === 'channelReject') {
          return h(
            'span', '通道驳回'
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

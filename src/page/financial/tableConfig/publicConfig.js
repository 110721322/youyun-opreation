export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '创建时间',
      prop: 'createTime',
      width: '120px'
    },
    {
      label: '服务商名称',
      prop: [{key: 'agentName'}, {key: 'agentNo', label: 'ID:'}],
      width: '120px'
    },
    {
      label: '购买项目',
      prop: 'purchaseItem',
      width: '120px'
    },
    {
      label: '打款金额（元）',
      prop: 'amount',
      width: '120px'
    },
    {
      label: '打款凭证',
      prop: 'voucher',
      width: '80px',
      type: 'img',
      render: (h, params) => {
        const imgUrl = params.row.voucher;
        return h('el-image', {
          props: {
            src: imgUrl,
            'preview-src-list': [imgUrl]
          }
        }, '正常');
      }
    },
    {
      label: '状态',
      prop: 'auditStatus',
      width: '90px',
      render: (h, params) => {
        if (params.row.auditStatus === 0) {
          return h(
            'span', '审核中'
          )
        }
        if (params.row.auditStatus === 1) {
          return h(
            'span', '通过'
          )
        }
        if (params.row.auditStatus === 2) {
          return h(
            'span', '驳回'
          )
        }
      }
    },
    {
      label: '驳回备注',
      prop: 'reason',
      width: '120px'
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
        name: '通过',
        emitName: 'adopt',
        type: 'text',
        isShow: ($row) => {
          if ($row.auditStatus === 0) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: '驳回',
        emitName: 'reject',
        type: 'text',
        isShow: ($row) => {
          if ($row.auditStatus === 0) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: '查看',
        emitName: 'detail',
        type: 'text',
        isShow: ($row) => {
          if ($row.auditStatus === 2) {
            return true;
          } else {
            return false;
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
  }
};

export const CHECKSERVICELIST_CONFIG = {
  gridConfig: [
    {
      label: '服务商',
      prop: [{ key: 'agentName' }, { key: 'agentNo', label: 'ID:' }],
      width: '150px'
    },
    {
      label: '法人',
      prop: [{ key: 'personName' }, { key: 'personMobile' }],
      width: '150px'
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: '150px'
    },
    {
      label: '所属运营',
      prop: 'operationName',
      width: '150px'
    },
    {
      label: '审核状态',
      prop: 'contractStatus',
      width: '150px',
      render: (h, params) => {
        if (params.row.contractStatus === 'waitSign') {
          return h(
            'span', '待审核'
          )
        }
        if (params.row.contractStatus === 'audit') {
          return h(
            'span', '待审核'
          )
        }
        if (params.row.contractStatus === 'success') {
          return h(
            'span', '审核通过'
          )
        }
        if (params.row.contractStatus === 'reject') {
          return h(
            'span', '审核拒绝'
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
          if ($item.contractStatus !== 'waitSign') {
            return true;
          } else {
            return false
          }
        }
      },
      {
        name: '审核',
        emitName: 'preApprove',
        type: 'text',
        isShow: ($item) => {
          if ($item.contractStatus === 'waitSign') {
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

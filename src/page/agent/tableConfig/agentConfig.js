export const USER_CONFIG = {
  gridConfig: [
    {
      label: '服务商',
      prop: [{ key: 'tel' }, { key: 'id', label: 'ID:' }],
      width: '150px'
    },
    {
      label: '开通时间',
      prop: 'email',
      width: '150px'
    },
    {
      label: '到期时间',
      prop: 'email',
      width: '150px'
    },
    {
      label: '商户数量（个）',
      prop: 'email',
      width: '150px'
    },
    {
      label: '开通会员商户数量（个）',
      prop: 'email',
      width: '185px'
    },

    {
      label: '状态',
      prop: 'status',

      render: (h, params) => {
        if (params.row.status === '0') {
          return h(
            'el-tag',
            {
              props: {
                size: 'medium ',
                type: 'warning'
              }
            },
            '已驳回'
          );
        } else {
          return h(
            'el-tag',
            {
              props: {
                size: 'medium ',
                type: 'success'
              }
            },
            '待审核'
          );
        }
      }
    },
    {
      label: '所属大区',
      prop: 'region',
      width: '150px'
    },
    {
      label: '服务地区',
      prop: 'email',
      width: '150px'
    },
    {
      label: '所属运营',
      prop: 'email',
      width: '150px'
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
        name: '冻结',
        emitName: 'frozen',
        type: 'text'
      },
      {
        name: '详情',
        emitName: 'detail',
        type: 'text'
      },
      {
        name: '解冻',
        emitName: 'thaw',
        type: 'text'
      },
      {
        name: '服务商后台',
        emitName: 'openAgentManager',
        type: 'text'
      },
      {
        name: '商户列表',
        emitName: 'goMerchantList',
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
  }
};

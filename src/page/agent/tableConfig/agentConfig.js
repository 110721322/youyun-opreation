export const USER_CONFIG = {
  gridConfig: [
    {
      label: '服务商',
      prop: [{ key: 'agentName' }, { key: 'agentNo', label: "ID:" }],
      width: '200px'
    },
    {
      label: '开通时间',
      prop: 'createTime',
      width: '200px'
    },
    {
      label: '到期时间',
      prop: 'expireDate',
      width: '200px'
    },
    {
      label: '商户数量（个）',
      prop: 'merchantCount',
      width: '150px'
    },
    {
      label: '开通会员商户数量（个）',
      prop: 'memberMerchantCount',
      width: '185px'
    },

    {
      label: '状态',
      prop: 'contractStatus',

      render: (h, params) => {
        if (params.row.contractStatus === 'success') {
          return h(
            'el-tag',
            {
              props: {
                size: 'medium ',
                type: 'success'
              }
            },
            '审核通过'
          );
        }
      }
    },
    {
      label: '所属大区',
      prop: 'regionName',
      width: '150px'
    },
    {
      label: '服务地区',
      prop: 'activeScopeType',
      width: '150px'
    },
    {
      label: '所属运营',
      prop: 'operationName',
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
        name: '补充',
        emitName: 'completion',
        type: 'text',
        style: 'color: #3ABD2D',
        isShow: ($row) => {
          if ($row.status === 'incomplete') {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: '冻结',
        emitName: 'frozen',
        type: 'text',
        isShow: ($row) => {
          if ($row.isBlocked === 0) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: '详情',
        emitName: 'detail',
        type: 'text',
        isShow: ($row) => {
          if ($row.status !== 'incomplete') {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: '解冻',
        emitName: 'thaw',
        type: 'text',
        isShow: ($row) => {
          if ($row.isBlocked === 1) {
            return true;
          } else {
            return false;
          }
        }
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

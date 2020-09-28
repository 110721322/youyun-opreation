export const USER_CONFIG = {
  gridConfig: [
    {
      label: '创建时间',
      prop: 'createTime',
      width: '120px'
    },
    {
      label: '顶级服务商ID',
      prop: 'channelAgentCode',
      width: '150px'
    },
    {
      label: '服务商名称',
      prop: 'channelAgentName',
      width: '150px'
    },
    {
      label: '法人',
      prop: 'personName',
      width: '60px'
    },
    {
      label: '所属运营',
      prop: 'operationName',
      width: '150px'
    },
    {
      label: '状态',
      prop: 'accountStatus',
      render: (h, params) => {
        if (params.row.status === 3) {
          return [h('span', {
            'class': "dot " + "review"
          }), params.row.statusName]
        } else if (params.row.status === 4) {
          return [h('span', {
            'class': "dot " + "opened"
          }), params.row.statusName]
        } else {
          return [h('span', {
            'class': "dot " + "unused"
          }), params.row.statusName]
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
        name: '补充资料',
        emitName: 'addInfo',
        type: 'text',
        style: 'color: #ffc620',
        isShow($row) {
          if ($row.status === 3) { return true } else { return false }
        }
      },
      {
        name: '详情',
        emitName: 'detail',
        type: 'text',
        isShow($row) {
          if ($row.status === 4) { return true } else { return false }
        }
      },
      {
        name: '冻结',
        emitName: 'frozen',
        type: 'text',
        isShow($row) {
          if ($row.status !== 5) { return true } else { return false }
        }
      },
      {
        name: '解冻',
        emitName: 'thaw',
        type: 'text',
        isShow($row) {
          if ($row.status === 5) { return true } else { return false }
        }
      },
      {
        name: '后台',
        emitName: 'openAgentManager',
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

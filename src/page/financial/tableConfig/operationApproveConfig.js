export const OPERATIONAPPROVE_CONFIG = {
  gridConfig: [
    {
      label: '顶级服务商',
      prop: [{ key: 'channelAgentName' }, { key: 'channelAgentCode', label: 'ID:' }],
      width: '90px'
    },
    {
      label: '结算金额(元) | 实际结算金额(元)',
      prop: [{ key: 'actualAmount', label: '结算金额:' }, { key: 'actualSettleCommission', label: '实际结算金额:' }],
      width: '150px'
    },
    {
      label: '结算类型',
      prop: 'settleType',
      width: '90px'
    },
    {
      label: '审核状态',
      prop: 'settleStatusName',
      width: '90px'

    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: '90px'
    },
    {
      label: '操作时间',
      prop: 'updateTime',
      width: '90px'
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
        type: 'text'
      },
      {
        name: '驳回',
        emitName: 'reject',
        type: 'text',
        isShow: ($row) => {
          if ($row.settleStatus === '61' || $row.settleStatus === '62') {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: '审核通过',
        emitName: 'adopt',
        type: 'text',
        isShow: ($row) => {
          if ($row.settleStatus === '61' || $row.settleStatus === '62') {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: '审批中',
        emitName: 'reviewing',
        type: 'text',
        isShow: ($row) => {
          if ($row.settleStatus === '21' || $row.settleStatus === '22') {
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

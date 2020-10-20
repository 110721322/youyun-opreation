export const USER_CONFIG = {
  gridConfig: [
    {
      label: '公司名称',
      prop: 'agentName',
      width: '90px'
    },
    {
      label: '法人姓名',
      prop: 'personName',
      width: '90px'
    },
    {
      label: '法人手机号',
      prop: 'personMobile',
      width: '90px'
    },
    {
      label: '邮箱',
      prop: 'email',
      width: '90px'
    },
    {
      label: '服务商类型',
      prop: 'businessType',
      width: '90px',
      render: (h, params) => {
        if (params.row.businessType === 'individual') {
          return h(
            'span', '个人'
          )
        }
        if (params.row.businessType === 'enterprise') {
          return h(
            'span', '企业'
          )
        }
      }
    },
    {
      label: '公司地址',
      prop: 'companyAddress',
      width: '120px',
      render: (h, params) => {
        return h(
          'span', `${params.row.provinceName}${params.row.cityName}${params.row.areaName}${params.row.companyAddress}`
        )
      }
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: '120px'
    },
    {
      label: '状态',
      prop: 'contractStatus',
      render: (h, params) => {
        if (params.row.contractStatus === 'audit') {
          return [h('span', {
            'class': "dot " + "platformAudit"
          }), '待审核']
        }
        if (params.row.contractStatus === 'waitSign') {
          return [h('span', {
            'class': "dot " + "platformAudit"
          }), '待签约']
        }
        if (params.row.contractStatus === 'reject') {
          return [h('span', {
            'class': "dot " + "reject"
          }), '已拒绝']
        }
        if (params.row.contractStatus === 'success') {
          return [h('span', {
            'class': "dot " + "success"
          }), '已通过']
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
        name: '驳回',
        emitName: 'reject',
        type: 'text',
        style: 'color:#F5222D',
        isShow: ($row) => {
          if ($row.contractStatus === 'audit' || $row.contractStatus === 'waitSign') {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: '激活',
        emitName: 'activation',
        type: 'text',
        isShow: ($row) => {
          if ($row.contractStatus === 'reject') {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: '通过',
        emitName: 'adopt',
        type: 'text',
        isShow: ($row) => {
          if ($row.contractStatus === 'audit' || $row.contractStatus === 'waitSign') {
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

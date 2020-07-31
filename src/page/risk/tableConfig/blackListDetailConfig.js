export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '信息类型',
      prop: 'banField',
      width: '150px',
      render: (h, params) => {
        if (params.row.banField === 'shopLicenseNo') {
          return h(
            'span', '营业执照编号'
          )
        }
        if (params.row.banField === 'lawIdCard') {
          return h(
            'span', '法人身份证号'
          )
        }
        if (params.row.banField === 'lawMobile') {
          return h(
            'span', '法人手机号'
          )
        }
        if (params.row.banField === 'bankCardNo') {
          return h(
            'span', '银行卡号'
          )
        }
      }
    },
    {
      label: '内容',
      prop: 'content',
      width: '150px'
    },
    {
      label: '加入人员',
      prop: 'operateUserName',
      width: '150px'
    },
    {
      label: '加入时间',
      prop: 'banCreateTime',
      width: '150px'
    },
    {
      label: '被拦截服务商',
      prop: [{ key: 'agentName' }, { key: 'agentNo', label: "ID:" }],
      width: '150px'
    },
    {
      label: '拦截时间',
      prop: 'banFilterTime',
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

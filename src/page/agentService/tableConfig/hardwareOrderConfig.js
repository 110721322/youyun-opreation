export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '订单号',
      prop: 'outputNo',
      width: '90px'
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: '90px'
    },
    {
      label: '购买服务商',
      prop: 'agentName',
      // prop: [{ key: "buyService" }, { key: "id", label: "ID:" }],
      width: '90px'

    },
    {
      label: '联系人',
      prop: 'buyerName',
      // prop: [{ key: "name" }, { key: "phone"}],
      width: '90px'
    },
    {
      label: '订单状态',
      prop: 'statusDesc',
      width: '90px'
    },
    {
      label: '订单金额（元）',
      prop: 'amount',
      width: '90px'
    },
    {
      label: '订单类型',
      prop: 'outputTypeDesc'
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

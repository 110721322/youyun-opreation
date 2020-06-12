export const USER_CONFIG = {
  gridConfig: [
    {
      label: '序号',
      prop: 'id',
      width: '150px'
    },
    {
      label: '订单号',
      prop: 'orderId',
      width: '150px'
    },
    {
      label: '创建时间',
      width: '200px',
      prop: 'createTime'
    },
    {
      label: '订单金额',
      width: '200px',
      prop: 'orderPrice'
    },
    {
      label: '订单状态',
      width: '200px',
      prop: 'orderStatus'
    },
    {
      label: '联系人',
      width: '200px',
      prop: 'callUser'
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
        name: '订单详情',
        emitName: 'detail',
        type: 'text'
      }
    ]
  }
};

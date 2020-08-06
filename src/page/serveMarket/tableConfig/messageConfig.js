export const USER_CONFIG = {
  gridConfig: [
    {
      label: '序号',
      prop: 'index',
      width: '150px'
    },
    {
      label: '充值时间',
      prop: 'payTime',
      width: '200px'
    },
    {
      label: '充值数量(条)',
      prop: 'comboCount',
      width: '200px'
    },
    {
      label: '短信剩余(条)',
      prop: 'createTime',
      width: '200px'
    },
    {
      label: '支付金额',
      prop: 'comboAmount',
      width: '200px'
    },
    {
      label: '支付方式',
      prop: 'payTypeName',
      width: '200px'
    },
    {
      label: '订单状态',
      prop: 'statusName',
      width: '200px'
    }
  ],
  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: [
      {
        name: '删除',
        emitName: 'remove',
        type: 'text',
        style: 'color:#F5222D'
      }
    ]
  },
  hideEditArea: false
}

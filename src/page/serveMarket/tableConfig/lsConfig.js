export const LS_CONFIG = {
  gridConfig: [
    {
      label: '序号',
      prop: 'id',
      width: '60px'
    },
    {
      label: '购买时间',
      prop: 'createTime',
      width: '120px'
    },
    {
      label: '通道名称',
      prop: 'name',
      width: '120px'
    },
    {
      label: '服务时长',
      prop: 'long',
      width: '120px'
    },
    {
      label: '支付金额(元)',
      prop: 'price',
      width: '120px'
    },
    {
      label: '支付方式',
      prop: 'payWay',
      width: '120px'
    },
    {
      label: '订单状态',
      prop: 'status',
      width: '120px'
    }
  ],
  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: []
  }
}

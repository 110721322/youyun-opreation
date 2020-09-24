export const BRAND_CONFIG = {
  gridConfig: [
    {
      label: '序号',
      prop: 'index',
      width: '60px',
      formatter($row, $index) {
        return $index + 1;
      }
    },
    {
      label: '购买时间',
      prop: 'payTime',
      width: '120px'
    },
    {
      label: '定制产品',
      prop: 'productName',
      width: '120px'
    },
    {
      label: '服务时长',
      prop: 'comboName',
      width: '120px'
    },
    {
      label: '支付金额(元)',
      prop: 'actualAmount',
      width: '120px'
    },
    {
      label: '支付方式',
      prop: 'payTypeName',
      width: '120px'
    },
    {
      label: '订单状态',
      prop: 'statusName',
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

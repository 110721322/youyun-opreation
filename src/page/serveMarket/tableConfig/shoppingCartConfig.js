export const SHOPPING_CONFIG = {
  gridConfig: [
    {
      label: '商品图片',
      prop: 'id',
      width: '150px'
    },
    {
      label: '商品名称',
      prop: 'goodsName'
    },
    {
      label: '商品单价',
      prop: 'goodsPrice'
    },
    {
      label: '购买数量',
      prop: 'num'
    },
    {
      label: '小计',
      prop: 'amount'
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
        emitName: 'delete',
        type: 'text'
      }
    ]
  },
  hideEditArea: false
}

export const SHOPPING_CONFIG = {
  gridConfig: [
    {
      label: '图片',
      prop: 'deviceImg',
      width: '120px',
      type: 'img',
      render: (h, params) => {
        const imgUrl = params.row.img;
        return h('el-image', {
          props: {
            src: imgUrl,
            'preview-src-list': [imgUrl]
          }
        }, '正常');
      }
    },
    {
      label: '商品名称',
      prop: 'deviceModel'
    },
    {
      label: '商品单价',
      prop: 'salePrice'
    },
    {
      label: '购买数量',
      prop: 'shopCartCount',
      width: '120px',
      isEdit: true
    },
    {
      label: '小计',
      prop: 'shopSubtotal'
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
      },
      {
        name: '编辑',
        emitName: 'rowEdit',
        type: 'text',
        isShow: ($item) => {
          if ($item.children) {
            return false
          } else {
            if (!$item.edit) {
              return true
            } else {
              return false
            }
          }
        }
      },
      {
        name: '完成',
        emitName: 'okEdit',
        type: 'text',
        isShow: ($item) => {
          if ($item.children) {
            return false
          } else {
            if ($item.edit) {
              return true
            } else {
              return false
            }
          }
        }
      }
    ]
  },
  hideEditArea: false
}

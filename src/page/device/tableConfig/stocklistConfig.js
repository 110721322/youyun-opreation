export const STOCKLIST_CONFIG = {
  gridConfig: [
    {
      label: '设备类型',
      prop: 'deviceType',
      width: '150px'
    },
    {
      label: '设备型号',
      prop: 'deviceModel',
      width: '150px'
    },
    {
      label: '图片',
      prop: 'deviceImg',
      width: '150px',
      type: 'img',
      render: (h, params) => {
        const imgUrl = params.row.deviceImg;
        return h('el-image', {
          props: {
            src: imgUrl,
            'preview-src-list': [imgUrl]
          }
        }, '正常');
      }
    },
    {
      label: '单台设备成本价(元)',
      prop: 'costPrice',
      width: '150px'
    },
    {
      label: '单台设备售卖价(元)',
      prop: 'salePrice',
      width: '150px'
    },
    {
      label: '剩余库存（台）',
      prop: 'surplusCount',
      width: '150px'
    },
    {
      label: '总库存（台）',
      prop: 'totalCount',
      width: '150px'
    },
    {
      label: '排序',
      prop: 'sort',
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
      {
        name: '订购',
        emitName: 'buy',
        type: 'text'
      },
      {
        name: '编辑',
        emitName: 'edit',
        type: 'text'
      },
      {
        name: '删除',
        emitName: 'remove',
        type: 'text',
        style: 'color:#F5222D'
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
  },
  hideEditArea: false
};

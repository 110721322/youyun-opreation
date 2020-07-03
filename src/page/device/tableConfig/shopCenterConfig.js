export const SHOPCENTER_CONFIG = {
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
      label: '排序',
      prop: 'sort',
      width: '150px'
    },
    {
      label: '更新时间',
      prop: 'updateTime',
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
        name: '编辑',
        emitName: 'edit',
        type: 'text'
      },
      {
        name: '删除',
        emitName: 'delete',
        type: 'text',
        style: 'color:#F5222D'
      },
      {
        name: '上架',
        emitName: 'on',
        type: 'text',
        isShow: ($item) => {
          console.log($item)
          if ($item.children) {
            return false
          } else {
            if ($item.status === 2) {
              return true
            } else {
              return false
            }
          }
        }
      },
      {
        name: '下架',
        emitName: 'off',
        type: 'text',
        isShow: ($item) => {
          if ($item.children) {
            return false
          } else {
            if ($item.status === 1) {
              return true
            } else {
              return false
            }
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
  },
  hideEditArea: false
};

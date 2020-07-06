export const OUTSHOP_CONFIG = {
  gridConfig: [
    {
      label: '状态',
      prop: 'bindStatus',
      width: '150px'
    },
    {
      label: '设备标识',
      prop: 'deviceIdentifier',
      width: '250px',
      isEdit: true
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
        name: '完成',
        emitName: 'okEdit',
        type: 'text',
        style: 'color:#3ABD2D',
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
      },
      {
        name: '编辑',
        emitName: 'rowEdit',
        type: 'text',
        style: 'color:#1989FA',
        isShow: ($item) => {
          if ($item.children) {
            return false
          } else {
            if (!$item.edit && $item.bindStatus === '未绑定') {
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

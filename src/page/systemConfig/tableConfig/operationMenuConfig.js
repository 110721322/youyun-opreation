
export const MENU_CONFIG = {
  gridConfig: [
    {
      label: '菜单名称',
      prop: 'menuName',
      width: '150px'
    },
    {
      label: "图标",
      prop: "menuIcon",
      width: "150px",
      render: (h, params) => {
        return (
          <i class={"iconfont " + params.row.menuIcon}></i>
        )
      }
    }
  ],
  childrenKey: 'childrenMenus',

  // crud的模态框表单配置，可配置表单类型，验证规则，是否必填,col-span布局可通过span参数配置

  // crud的操作按钮配置，基础按钮有添加、修改、删除、查看，还可以配置扩展按钮
  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: [
      {
        name: '添加下级菜单',
        emitName: 'addSubMenu',
        type: 'text',
        permission: '待开发'
      },
      {
        name: '编辑',
        emitName: 'edit',
        type: 'text',
        permission: '待开发'
      },
      {
        name: '删除',
        emitName: 'adopt',
        type: 'text',
        permission: '待开发'
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
  hideEditArea: true
};

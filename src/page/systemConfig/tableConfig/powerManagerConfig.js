
export const POWERMANAGER_CONFIG = {
  gridConfig: [
    {
      label: '页面名称',
      prop: 'type',
      width: '50px'
    },
    {
      label: '按钮名称',
      prop: 'btnList',
      width: '150px',
      render: (h, params) => {
        const targetList = [];
        if (params.row.btnList) {
          for (const item of params.row.btnList) {
            const targetName = item.name;
            const target = h('el-tag',
              {
                props: {
                  size: 'medium'
                },
                style: {
                  marginLeft: '10px',
                  marginBottom: '10px',
                  display: 'block',
                  float: 'left'
                }
              },
              targetName);
            targetList.push(target)
          }
        }

        return h('div',
          targetList
        );
      }
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
        name: '添加',
        emitName: 'add',
        type: 'text'
      },
      {
        name: '编辑',
        emitName: 'edit',
        type: 'text'
      },
      {
        name: '按钮',
        emitName: 'btns',
        type: 'text'
      },
      {
        name: '删除',
        emitName: 'delet',
        type: 'text'
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

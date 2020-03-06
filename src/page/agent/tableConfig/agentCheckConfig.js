export const USER_CONFIG = {
  gridConfig: [
    {
      label: '公司名称',
      prop: 'id',
      width: '90px'
    },
    {
      label: '法人',
      prop: 'tel',
      width: '90px'
    },
    {
      label: '邮箱',
      prop: 'email',
      width: '90px'
    },
    {
      label: '服务商类型',
      prop: 'name',
      width: '90px'

    },
    {
      label: '公司地址',
      prop: 'name',
      width: '90px'
    },
    {
      label: '创建时间',
      prop: 'name',
      width: '90px'
    },
    {
      label: '状态',
      prop: 'status',

      render: (h, params) => {
        if (params.row.status === '0') {
          return h(
            'el-tag',
            {
              props: {
                size: 'medium ',
                type: 'warning'
              }
            },
            '已驳回'
          );
        } else {
          return h(
            'el-tag',
            {
              props: {
                size: 'medium ',
                type: 'success'
              }
            },
            '待审核'
          );
        }
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
        name: '驳回',
        emitName: 'reject',
        type: 'text',
        style: 'color:#F5222D',
        isShow: ($row) => {
          if ($row.id === '1') {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: '激活',
        emitName: 'activation',
        type: 'text'
      },
      {
        name: '通过',
        emitName: 'adopt',
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
  }
};

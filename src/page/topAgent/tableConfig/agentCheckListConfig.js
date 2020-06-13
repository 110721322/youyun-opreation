export const USER_CONFIG = {
  gridConfig: [
    {
      label: '创建时间',
      prop: 'createTime',
      width: '160px'
    },
    {
      label: '服务商名称',
      prop: 'name'
    },
    {
      label: '法人',
      prop: 'lawPerson',
      width: '90px'
    },
    {
      label: '邮箱',
      prop: 'email',
      width: '90px'
    },
    {
      label: '服务商类型',
      prop: 'businessType',
      width: '90px'
    },
    {
      label: '公司地址',
      prop: 'companyArea.detailAddress',
      width: '90px'
    },
    {
      label: '状态',
      prop: 'accountStatus',
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
  }
};

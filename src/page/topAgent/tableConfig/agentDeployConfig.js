export const USER_CONFIG = {
  gridConfig: [
    {
      label: '序号',
      prop: 'sort',
      width: '60px'
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: '160px'
    },
    {
      label: '服务商ID',
      prop: 'ID',
      width: '160px'
    },
    {
      label: '服务商名称',
      prop: 'name',
      width: '160px'
    },
    {
      label: '法人',
      prop: 'people',
      width: '160px'
    },
    {
      label: '服务器部署状态',
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
            '待部署'
          );
        } else if (params.row.status === '1') {
          return h(
            'el-tag',
            {
              props: {
                size: 'medium ',
                type: 'success'
              }
            },
            '部署中'
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
            '已完成'
          );
        }
      }
    }
  ],
  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: [
      {
        name: '立即部署',
        emitName: 'reject',
        type: 'text',
        isShow: ($row) => {
          if ($row.id === '1') {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: '查看详情',
        emitName: 'activation',
        type: 'text'
      },
      {
        name: '部署完成',
        emitName: 'adopt',
        type: 'text'
      }
    ]
  }
}

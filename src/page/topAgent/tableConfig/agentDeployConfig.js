export const USER_CONFIG = {
  gridConfig: [
    {
      label: '序号',
      prop: 'sort',
      width: '60px',
      formatter($row, $index) {
        return $index + 1;
      }
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: '160px'
    },
    {
      label: '服务商ID',
      prop: 'channelAgentCode',
      width: '160px'
    },
    {
      label: '服务商名称',
      prop: 'channelAgentName',
      width: '160px'
    },
    {
      label: '法人',
      prop: 'personName',
      width: '160px'
    },
    {
      label: '服务器部署状态',
      prop: 'status',
      render: (h, params) => {
        if (params.row.status === 1) {
          return h(
            'el-tag',
            {
              props: {
                size: 'medium ',
                type: 'warning'
              }
            },
            params.row.statusName
          );
        } else if (params.row.status === 2) {
          return h(
            'el-tag',
            {
              props: {
                size: 'medium ',
                type: 'primary'
              }
            },
            params.row.statusName
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
            params.row.statusName
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
        emitName: 'deployStart',
        type: 'text',
        isShow: ($row) => {
          if ($row.status === 1) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: '部署完成',
        emitName: 'deployEnd',
        type: 'text',
        isShow: ($row) => {
          if ($row.status === 2) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: '查看详情',
        emitName: 'detail',
        type: 'text'
      }
    ]
  }
}

export const USER_CONFIG = {
  gridConfig: [
    {
      label: '创建时间',
      prop: 'createTime',
      width: '120px'
    },
    {
      label: '服务商名称',
      prop: 'channelAgentName',
      width: '120px'
    },
    {
      label: '法人',
      prop: 'personName',
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
      prop: 'address',
      width: '130px',
      render: (h, params) => {
        return h(
          'span', `${params.row.provinceName}${params.row.cityName}${params.row.areaName}${params.row.address}`
        )
      }
    },
    {
      label: '状态',
      prop: 'accountStatus',
      render: (h, params) => {
        if (params.row.status === 1) {
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
        } else {
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
        name: '通过',
        emitName: 'pass',
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
        name: '驳回',
        emitName: 'reject',
        type: 'text',
        style: 'color:#F5222D',
        isShow: ($row) => {
          if ($row.status === 1) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: '激活',
        emitName: 'active',
        type: 'text',
        isShow: ($row) => {
          if ($row.status !== 1) {
            return true;
          } else {
            return false;
          }
        }
      }
    ]
  }
};

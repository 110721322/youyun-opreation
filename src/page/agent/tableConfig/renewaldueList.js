export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '服务商',
      prop: [{ key: 'agentName' }, { key: 'agentNo', label: "ID:" }],
      width: '150px'
    },
    {
      label: '续费时间',
      prop: 'createTime',
      width: '150px'
    },
    {
      label: '开通时间',
      prop: 'activeDate',
      width: '120px'
    },
    {
      label: '到期时间',
      prop: 'expiredDate',
      width: '120px'
    },
    {
      label: '续费时长(月)',
      prop: 'renewMonth'
    },
    {
      label: '支付方式',
      prop: 'payType'
    },
    {
      label: '续费时长(年)',
      prop: 'renewMonth'
    },
    {
      label: '实付金额',
      prop: 'actualAmount'
    },
    {
      label: '状态',
      prop: 'status',
      render: (h, params) => {
        if (params.row.status === 1) {
          return h(
            'el-tag',
            {
              props: {
                size: 'medium ',
                type: 'info'
              }
            },
            '审核中'
          );
        }
        if (params.row.status === 2) {
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
        if (params.row.status === 3) {
          return h(
            'el-tag',
            {
              props: {
                size: 'medium ',
                type: 'fail'
              }
            },
            '财务驳回'
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
    view: false
  },
  hideEditArea: true
};

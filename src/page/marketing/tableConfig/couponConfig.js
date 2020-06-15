export const USER_CONFIG = {
  gridConfig: [
    {
      label: '编号',
      prop: 'sort',
      width: '80px'
    },
    {
      label: '优惠码名称',
      prop: 'couponName',
      width: '120px'
    },
    {
      label: '优惠码面值(元)',
      prop: 'couponPrice',
      width: '120px'
    },
    {
      label: '有效期',
      prop: 'timeData',
      width: '90px'
    },
    {
      label: '库存',
      prop: 'sale',
      width: '90px'
    },
    {
      label: '领取数量',
      prop: 'achieve',
      width: '90px'
    },
    {
      label: '核销数量',
      prop: 'writeOff',
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
            '已结束'
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
            '进行中'
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
        name: '推广',
        emitName: 'extension',
        type: 'text',
        isShow: ($row) => {
          if ($row.status === '1') {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: '详情',
        emitName: 'detail',
        type: 'text'
      },
      {
        name: '结束该活动',
        emitName: 'stopAcitive',
        type: 'text'
      }
    ]
  }
};

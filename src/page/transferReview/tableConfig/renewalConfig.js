export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '服务商',
      prop: [{ key: 'agentName' }, { key: 'agentNo', label: 'ID:' }],
      width: '90px'
    },
    {
      label: '服务商区域等级',
      prop: 'amount',
      width: '130px'
    },
    {
      label: '续费时长（年）',
      prop: 'type',
      width: '130px'
    },
    {
      label: '订单金额（元）',
      prop: 'status',
      width: '130px'

    },
    {
      label: '审核状态',
      prop: 'status',
      // render: (h, params) => {
      //   const status = params.row.status;
      //   return h('el-tooltip', {
      //     attrs: {
      //       content: status,
      //       placement: "top"
      //     }
      //   }, status);
      // },
      width: '90px'
    },
    {
      label: '打款凭证',
      prop: 'image',
      width: '150px',
      type: 'img',
      render: (h, params) => {
        const imgUrl = params.row.image;
        return h('el-image', {
          props: {
            src: imgUrl,
            'preview-src-list': [imgUrl]
          }
        }, '正常');
      }
    },
    {
      label: '创建时间',
      prop: 'operTime',
      width: '130px'
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
        name: '详情',
        emitName: 'detail',
        type: 'text'
      },
      {
        name: '驳回',
        emitName: 'reject',
        type: 'text'
        // isShow: ($row) => {
        //   if ($row.showReject === true) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // }
      },
      {
        name: '通过',
        emitName: 'adopt',
        type: 'text'
        // isShow: ($row) => {
        //   if ($row.showAdopt === true) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // }
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
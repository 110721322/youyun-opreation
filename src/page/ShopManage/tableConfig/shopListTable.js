export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '门店ID',
      prop: 'shopNo'
    },
    {
      label: '所属服务商',
      prop: 'shopNo'
    },
    {
      label: '所属商户',
      prop: 'shopNo'
    },
    {
      label: '门店名称',
      prop: 'shopName'
    },
    {
      label: '门店类目',
      prop: 'shopName'
    },
    {
      label: 'logo或门头照',
      prop: 'shopName'
    },
    {
      label: '服务电话',
      prop: 'shopName'
    },
    {
      label: '设备数量',
      prop: 'shopName'
    },
    {
      label: '门店地址',
      prop: 'address'
    },
    {
      label: '门店状态',
      prop: 'status',
      render: (h, params) => {
        if (params.row.status === 0) {
          return '禁用'
        }
        if (params.row.status === 1) {
          return '启用'
        }
      }
    },
    {
      label: '审核状态',
      prop: 'phone',
      render: (h, params) => {
        let config = {}
        switch (params.row.orderStatus) {
          case 0:
            config = {color: "#1989FA", text: '平台审核中'};
            break;
          case 1:
            config = {color: "#1989FA", text: '通道审核中'};
            break;
          case 2:
            config = {color: "#50C514", text: '已开通'};
            break;
          case 3:
            config = {color: "#50C514", text: '驳回'};
            break;
          case 4:
            config = {color: "#F52130", text: '微信未认证'};
            break;
        }
        return (
          <span class="flex-align-center">
            <i style={{"display": "block", "width": "6px", "height" :"6px", "margin-right": "4px", "background": config.color, "border-radius": "50%"}}></i>{config.text}
          </span>
        );
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
        name: '详情',
        emitName: 'detail',
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

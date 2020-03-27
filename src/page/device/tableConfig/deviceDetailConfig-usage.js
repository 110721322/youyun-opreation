import icon from "@/assets/img/life.png";
export const DEVICEDETAIL_CONFIG = {
  gridConfig: [
    {
      label: '设备型号',
      prop: 'deviceModel',
      width: '150px',
      hasImg: true,
      imgUrl: icon,
      emitName: 'showLife',
      imgStyle: 'width:16px;height:16px;cursor:pointer;vertical-align: middle;margin-left: 5px;'
    },
    // {
    //   label: '',
    //   prop: 'id',
    //   width: '1px',
    //   customIsExpand: true
    // },

    {
      label: '设备标识',
      prop: 'deviceIdentifier',
      width: '150px'
    },
    {
      label: '所属商户',
      prop: 'merchantName',
      width: '150px'
    },
    {
      label: '所属服务商',
      prop: 'agentName',
      width: '150px'
    },
    {
      label: '订单数量（笔）',
      prop: 'tradeCount',
      width: '150px'
    },
    {
      label: '交易额（元）',
      prop: 'tradeAmount',
      width: '150px'
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
        name: '解绑',
        emitName: 'distribution',
        type: 'text'
      },
      {
        name: '恢复可用',
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
  },
  hideEditArea: true
};

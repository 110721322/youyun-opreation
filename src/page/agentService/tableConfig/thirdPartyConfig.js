export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '服务商',
      prop: [{ key: 'agentName' }, { key: 'agentNo', label: "ID:" }],
      width: '150px'
    },
    {
      label: '对接商名称',
      prop: 'name',
      width: '100px'
    },
    {
      label: '对接秘钥',
      prop: 'appsecret',
      width: '180px'
    },
    {
      label: '对接设备开头编码',
      prop: 'dockingDeviceId',
      width: '150px'
    },
    {
      label: '状态',
      prop: 'serviceStatusMsg',
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
        name: '冻结',
        emitName: 'freeze',
        type: 'text',
        isShow: ($item) => {
          return $item.serviceStatus === 0
        }
      },
      {
        name: '解冻',
        emitName: 'unfreeze',
        type: 'text',
        isShow: ($item) => {
          return $item.serviceStatus === 1
        }
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

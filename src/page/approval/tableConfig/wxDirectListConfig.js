export const WXDIRECTLIST_CONFIG = {
  gridConfig: [
    {
      label: '商户名称',
      prop: 'merchantName',
      width: '150px'
    },
    {
      label: '入件时间',
      prop: 'time',
      width: '150px'
    },
    {
      label: '所属运营',
      prop: 'oper',
      width: '150px'
    },
    {
      label: '状态',
      prop: 'status',
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
        name: '详情',
        emitName: 'detail',
        type: 'text',
        isShow: ($item) => {
          if ($item.showDetail) {
            return true;
          } else {
            return false
          }
        }
      },
      {
        name: '预审核',
        emitName: 'preApprove',
        type: 'text',
        isShow: ($item) => {
          if ($item.showPreApprove) {
            return true;
          } else {
            return false
          }
        }
      },
      {
        name: '通过',
        emitName: 'pass',
        type: 'text',
        isShow: ($item) => {
          if ($item.showPass) {
            return true;
          } else {
            return false
          }
        }
      },
      {
        name: '驳回',
        emitName: 'reject',
        type: 'text',
        isShow: ($item) => {
          if ($item.showReject) {
            return true;
          } else {
            return false
          }
        }
      },
      {
        name: '审核记录',
        emitName: 'record',
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

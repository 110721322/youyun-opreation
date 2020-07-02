export const REPAIRLIST_CONFIG = {
  gridConfig: [
    {
      label: '单号',
      prop: 'orderNo',
      width: '150px'
    },
    {
      label: '设备型号',
      prop: 'deviceModel',
      width: '150px'
    },
    {
      label: '所属服务商',
      prop: [{ key: 'agentName' }, { key: 'agentNo', label: 'ID:' }],
      width: '150px'
    },
    {
      label: '所属运营',
      prop: 'operationName',
      width: '150px'
    },
    {
      label: '返修原因',
      prop: 'maintainReason',
      width: '150px'
    },
    {
      label: '照片',
      prop: 'img',
      width: '150px',
      render: (h, params) => {
        const imgUrl = params.row.img;
        return h('el-image', {
          props: {
            src: imgUrl,
            'preview-src-list': [imgUrl]
          }
        }, '正常');
      }
    },
    {
      label: '提交时间',
      prop: 'createTime',
      width: '150px'
    },
    {
      label: '状态',
      prop: 'statusDesc',
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
        name: '通过',
        emitName: 'pass',
        type: 'text',
        isShow: ($item) => {
          if ($item.children) {
            return false
          } else {
            if ($item.status === 1) {
              return true
            } else {
              return false
            }
          }
        }
      },
      {
        name: '驳回',
        emitName: 'reject',
        type: 'text',
        isShow: ($item) => {
          if ($item.children) {
            return false
          } else {
            if ($item.status === 1) {
              return true
            } else {
              return false
            }
          }
        }
      },
      {
        name: '分配',
        emitName: 'distribution',
        type: 'text',
        isShow: ($item) => {
          if ($item.children) {
            return false
          } else {
            if ($item.status === 6) {
              return true
            } else {
              return false
            }
          }
        }
      }, {
        name: '发货',
        emitName: 'send',
        type: 'text',
        isShow: ($item) => {
          if ($item.children) {
            return false
          } else {
            if ($item.status === 6) {
              return true
            } else {
              return false
            }
          }
        }
      },
      {
        name: '完成',
        emitName: 'done',
        type: 'text',
        isShow: ($item) => {
          if ($item.children) {
            return false
          } else {
            if ($item.status === 5) {
              return true
            } else {
              return false
            }
          }
        }
      },
      {
        name: '确定收货',
        emitName: 'Receipt',
        type: 'text',
        isShow: ($item) => {
          console.log($item)
          if ($item.children) {
            return false
          } else {
            if ($item.status === 4) {
              return true
            } else {
              return false
            }
          }
        }
      },
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

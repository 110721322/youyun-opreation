export const TABLE_CONFIG = {
  gridConfig: [
    {
      label: '门店ID',
      prop: 'shopNo'
    },
    {
      label: '所属服务商',
      prop: 'agentName'
    },
    {
      label: '所属商户',
      prop: 'merchantName'
    },
    {
      label: '门店名称',
      prop: 'shopName'
    },
    {
      label: '门店类目',
      prop: 'mccCodeCN'
    },
    {
      label: 'logo或门头照',
      prop: 'shopImg',
      render: (h, params) => {
        const imgUrl = params.row.shopImg;
        return h('el-image', {
          props: {
            src: imgUrl,
            'preview-src-list': [imgUrl]
          }
        }, '正常');
      }
    },
    {
      label: '服务电话',
      prop: 'phone'
    },
    // {
    //   label: '设备数量',
    //   prop: 'shopName'
    // },
    {
      label: '门店地址',
      prop: 'address'
    },
    {
      label: '门店状态',
      prop: 'isDisabled',
      render: (h, params) => {
        const actions = new Map([
          [0, {className: 's-status-success', statusDesc: '启用'}],
          [1, {className: 's-status-fail', statusDesc: '禁用'}],
          ['default', {className: 's-status-pending', statusDesc: '--'}]
        ])
        const action = actions.get(params.row.isDisabled) || actions.get('default')
        return (
          <span class={['flex-align-center', 'g-status-icon', 's-status-radius', action.className]}>{ action.statusDesc }</span>
      )
      }
    },
    {
      label: '审核状态',
      prop: 'status',
      render: (h, params) => {
        const actions = new Map([
          [0, {className: 's-status-pending', statusDesc: '预审核中'}],
          [1, {className: 's-status-fail', statusDesc: '平台驳回'}],
          [2, {className: 's-status-pending', statusDesc: '通道审核中'}],
          [3, {className: 's-status-fail', statusDesc: '通道驳回'}],
          [4, {className: 's-status-success', statusDesc: '通道通过'}],
          [5, {className: 's-status-pending', statusDesc: '微信实名认证中'}],
          [6, {className: 's-status-fail', statusDesc: '微信认证拒绝'}],
          [7, {className: 's-status-success', statusDesc: '微信认证成功'}],
          ['default', {className: 's-status-pending', statusDesc: '--'}]
        ])
        const action = actions.get(params.row.status) || actions.get('default')
        return (
          <span class={['flex-align-center', 'g-status-icon', 's-status-radius', action.className]}>{ action.statusDesc }</span>
        )
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

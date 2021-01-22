export const DEVICE_MODEL_CONFIG = {
  gridConfig: [
    {
      label: '序号',
      prop: 'deviceNo',
      render: (h, params) => {
        return h(
          'span', { 'class': 'tab-color' }, params.row.deviceNo
        )
      }
    },
    {
      label: '设备类型',
      prop: 'deviceType',
    },
    {
      label: '设备型号',
      prop: 'deviceModel',
    },
    {
      label: '设备图片',
      prop: 'deviceImg'
    },
    {
      label: '设备数量',
      prop: 'deviceNum'
    },
    {
      label: '添加人',
      prop: 'currentAgentNo'
    },
    {
      label: '添加时间',
      prop: 'currentStatusDate'
    },
    {
      label: '保修到期时间',
      prop: 'expireDate'
    }
  ],


  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: [
      {
        name: '编辑',
        emitName: 'edit',
        type: 'text'
      }
    ]
  }
};

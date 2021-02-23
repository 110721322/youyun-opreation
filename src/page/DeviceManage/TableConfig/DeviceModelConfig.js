export const DEVICE_MODEL_CONFIG = {
  gridConfig: [
    {
      label: '序号',
      prop: 'rank'
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
      prop: 'deviceImg',
      render: (h, params) => {
        const imgUrl = params.row.deviceImg;
        return h('el-image', {
          props: {
            src: imgUrl,
            'preview-src-list': [imgUrl]
          }
        }, '正常');
      }
    },
    {
      label: '设备数量',
      prop: 'deviceCount'
    },
    {
      label: '添加人',
      prop: 'creator'
    },
    {
      label: '添加时间',
      prop: 'createTime'
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

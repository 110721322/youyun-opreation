export const RECORD_CONFIG = {
  gridConfig: [
    {
      label: '操作时间',
      prop: 'deviceNo'
    },
    {
      label: '对象类型',
      prop: 'deviceType',
    },
    {
      label: '对象名称',
      prop: 'deviceModel',
    },
    {
      label: '操作类型',
      prop: 'deviceImg'
    },
    {
      label: '操作员',
      prop: 'deviceNum'
    }
  ],


  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: []
  },
  hideEditArea: true
};

export const RECORD_CONFIG = {
  gridConfig: [
    {
      label: '操作时间',
      prop: 'createTime'
    },
    {
      label: '对象类型',
      prop: 'roleName',
    },
    {
      label: '对象名称',
      prop: 'toOperatorName',
    },
    {
      label: '操作类型',
      prop: 'operType'
    },
    {
      label: '操作员',
      prop: 'fromOperName'
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

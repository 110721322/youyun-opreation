export const FORM_CONFIG2 = {
  gridConfig: [
    {
      label: '序号',
      prop: 'index',
      width: '50px',
      render: (h, params) => {
        return h('span', params.index + 1);
      }
    },
    {
      label: '服务商ID',
      prop: 'agentNo',
      width: '130px'
    },
    {
      label: '服务商名称',
      prop: 'agentName',
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
  }
};

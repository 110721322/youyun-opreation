import { PERSON_LIST_EDIT, PERSON_LIST_DEL } from "../../../libs/data/permissionBtns";

export const USERLIST_CONFIG = {
  gridConfig: [
    {
      label: '花名',
      prop: 'jobName',
      width: '150px'
    },
    {
      label: '工号',
      prop: 'jobNumber',
      width: '150px'
    },
    {
      label: '姓名',
      prop: 'name',
      width: '150px'
    },
    {
      label: '手机号',
      prop: 'phone',
      width: '150px'
    },
    {
      label: '性别',
      prop: 'sex',
      width: '150px',
      render: (h, params) => {
        if (params.row.sex === 1) {
          return h(
            'span', '男'
          )
        }
        if (params.row.sex === 0) {
          return h(
            'span', '女'
          )
        }
      }
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: '150px'
    },
    {
      label: '邮箱',
      prop: 'email',
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
        name: '编辑',
        emitName: 'edit',
        type: 'text',
        permission: PERSON_LIST_EDIT
      },
      {
        name: '删除',
        emitName: 'remove',
        type: 'text',
        style: 'color:#F5222D',
        permission: PERSON_LIST_DEL
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

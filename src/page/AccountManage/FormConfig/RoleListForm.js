export const SEARCH_CONFIG = [
  {
    type: 0,
    label: '权限组名称',
    key: 'roleName',
    span: 12
  }
]

export const ADD_ROLE_CONFIG = [
  {
    type: 0,
    label: '权限组名称',
    key: 'roleName',
    initVal: '',
    placeholder: '请输入',
    maxlength: 20,
    span: 24,
    rules: [
      { required: true, message: '请输入权限组名称', trigger: 'blur' }
    ]
  },
  {
    type: 0,
    label: '权限组ID',
    key: 'id',
    initVal: '',
    isShow: false
  }
]

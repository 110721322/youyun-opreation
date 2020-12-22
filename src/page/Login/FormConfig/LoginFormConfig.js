export const FORM_CONFIG = [
  {
    type: 0,
    label: '新登录密码',
    key: 'password',
    inputType: 'password',
    initVal: '',
    style: 'width: 272px;',
    span: 24,
    rules: [
      { required: true, message: '请输入新登录密码', trigger: 'blur' }
    ]
  },
  {
    type: 0,
    label: '登录手机号',
    key: 'phone',
    initVal: '',
    style: 'width: 272px;',
    rules: [
      { required: true, message: '请输入登录手机号', trigger: 'blur' }
    ],
    span: 24
  },
  {
    type: 0,
    label: '短信验证码',
    key: 'code',
    initVal: '',
    style: 'width: 162px;',
    span: 24,
    slot: 'code',
    rules: [
      { required: true, message: '请输入短信验证码', trigger: 'blur' }
    ]
  }
]

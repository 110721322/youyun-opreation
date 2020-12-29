import {validPhone} from "youyun-vue-components/global/kit/validate";

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
    isDisabled: true,
    style: 'width: 272px;',
    maxlength: 11,
    rules: [
      { required: true, message: '请输入登录手机号', trigger: 'blur' },
      {
        validator: (rules, value, callback) => {
          if (!validPhone(value)) {
            callback(new Error('请输入规范手机号'))
          }
          callback()
        }
      }
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
    maxlength: 6,
    slot: 'code',
    rules: [
      { required: true, message: '请输入短信验证码', trigger: 'blur' }
    ]
  }
]

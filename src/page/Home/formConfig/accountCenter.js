import { validPhone } from "youyun-vue-components/global/kit/validate";

export const FORM_CONFIG = [
  {
    label: "账户ID",
    key: "id"
  },
  {
    label: "账户分组",
    key: "roleName"
  },
  {
    label: "账户昵称",
    key: "name"
  },
  {
    label: "登录手机号",
    key: "phone",
    emitEdit: 'editAccount'
  }
]

const validatorPhone = (rules, value, callback) => {
  if (!validPhone(value)) {
    callback(new Error('请输入规范手机号'))
  }
  callback()
}

export const FORM_PHONE_CONFIG = [
  {
    type: 0,
    label: '登录手机号',
    isDisabled: true,
    initVal: '',
    key: 'oldPhone',
    style: 'width: 272px;',
    labelWidth: '120px',
    rules: [
      { required: true, message: '请输入登录手机号', trigger: 'blur' },
      { validator: validatorPhone, trigger: 'blur' }
    ],
    span: 24
  },
  {
    type: 0,
    label: '短信验证码',
    placeholder: '请输入',
    initVal: '',
    key: 'oldCode',
    slot: 'oldCode',
    style: 'width: 150px;',
    labelWidth: '120px',
    maxlength: 6,
    rules: [
      { required: true, message: '请输入短信验证码', trigger: 'blur' }
    ],
    span: 24
  },
  {
    type: 0,
    label: '新登录手机号',
    initVal: '',
    key: 'newPhone',
    style: 'width: 272px;',
    labelWidth: '120px',
    rules: [
      { required: true, message: '请输入新登录手机号', trigger: 'blur' },
      { validator: validatorPhone, trigger: 'blur' }
    ],
    span: 24
  },
  {
    type: 0,
    label: '短信验证码',
    placeholder: '请输入',
    initVal: '',
    key: 'newCode',
    slot: 'newCode',
    style: 'width: 150px;',
    labelWidth: '120px',
    maxlength: 6,
    rules: [
      { required: true, message: '请输入短信验证码', trigger: 'blur' }
    ],
    span: 24
  }
]

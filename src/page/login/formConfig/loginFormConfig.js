import { validPhone, validEmail } from "@/libs/kit/validate";

var validatorPhone = (rule, value, callback) => {
  if (!validPhone(value)) {
    callback(new Error('请输入规范手机号'))
  } else {
    callback()
  }
}

export const REGISTER_FORM_CONFIG = {
  rules: {
    businessType: [
      { required: true, message: '请选择账户类型', trigger: 'change' }
    ],
    company: [
      { required: true, message: '请输入公司名称', trigger: 'blur' }
    ],
    personName: [
      { required: true, message: '请输入法人姓名', trigger: 'blur' }
    ],
    personMobile: [
      { required: true, message: '请输入法人手机号', trigger: 'blur' },
      { validator: validatorPhone, trigger: 'blur' }
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (!validEmail(value)) {
            callback(new Error('请输入规范邮箱'))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ],
    address: [
      { required: true, message: '请输入详细地址', trigger: 'blur' }
    ],
    county: [
      { required: true, message: '请选择省市区', trigger: 'change' }
    ],
    phone: [
      { required: true, message: '请输入登录手机号', trigger: 'blur' },
      { validator: validatorPhone, trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入6-20位密码', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (value.length < 6 || value.length > 20) {
            callback(new Error('请输入6-20位密码'))
          } else {
            callback()
          }
        }, trigger: 'blur'
      }
    ]
  }
}

export const LOGIN_FORM_CONFIG = {
  rules: {
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入6-20位密码', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (value.length < 6 || value.length > 20) {
            callback(new Error('请输入6-20位密码'))
          } else {
            callback()
          }
        }, trigger: 'blur'
      }
    ]
  },
  rules2: {
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { validator: validatorPhone, trigger: 'blur' }
    ],
    verification: [
      { required: true, message: '请输入验证码', trigger: 'blur' }
    ]
  }
}

export const CHANGE_FORM_CONFIG = {
  rules: {
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { validator: validatorPhone, trigger: 'blur' }
    ],
    code: [
      { required: true, message: '请输入验证码', trigger: 'blur' }
    ]
  }
}

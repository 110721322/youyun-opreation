export const FORM_CONFIG = {
  accountInfoData: {
    name: "账户信息",
    items: [
      {
        name: "门店信息",
        key: "merchantNo"
      },
      {
        name: "账户分组",
        key: "phone"
      },
      {
        name: "账户昵称",
        key: "shopNo"
      },
      {
        name: "登录手机号",
        key: "shopName"
      }
    ]
  },
  passwordFormConfig: [
    {
      type: 0,
      label: "新密码",
      key: "alipayRate",
      initVal: "",
      labelWidth: '120px',
      rules: [
        { required: true, message: '请输入', trigger: 'blur' }
      ]
    },
    {
      type: 0,
      label: "登录手机号",
      key: "wechatPayRate",
      initVal: "",
      labelWidth: '120px',
      maxlength: 11,
      rules: [
        { required: true, message: '请输入登录手机号', trigger: 'blur' }
      ]
    },
    {
      type: 0,
      label: "短信验证码",
      key: "cloudPayGt1000Rate",
      initVal: "",
      labelWidth: '120px',
      rules: [
        { required: true, message: '请输入短信验证码', trigger: 'blur' }
      ]
    }
  ],
  phoneFormConfig: [
    {
      type: 0,
      label: "登录手机号",
      key: "wechatPayRate",
      initVal: "",
      labelWidth: '120px',
      maxlength: 11,
      rules: [
        { required: true, message: '请输入登录手机号', trigger: 'blur' }
      ]
    },
    {
      type: 0,
      label: "短信验证码",
      key: "cloudPayGt1000Rate",
      initVal: "",
      labelWidth: '120px',
      rules: [
        { required: true, message: '请输入短信验证码', trigger: 'blur' }
      ]
    },
    {
      type: 0,
      label: "新登录手机号",
      key: "wechatPayRate",
      initVal: "",
      labelWidth: '120px',
      maxlength: 11,
      rules: [
        { required: true, message: '请输入新登录手机号', trigger: 'blur' }
      ]
    },
    {
      type: 0,
      label: "短信验证码",
      key: "cloudPayGt1000Rate",
      initVal: "",
      labelWidth: '120px',
      rules: [
        { required: true, message: '请输入短信验证码', trigger: 'blur' }
      ]
    }
  ]
}